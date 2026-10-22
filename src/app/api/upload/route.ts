import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/avif',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  try {
    // 1. Verify admin authentication
    const cookieStore = cookies();
    const token = cookieStore.get('rc_admin_token')?.value;
    if (token !== 'rc_authenticated_admin_session_token') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin credentials required to upload media.' },
        { status: 401 }
      );
    }

    // 2. Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
    }

    // 3. Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type "${file.type}". Allowed formats: JPEG, PNG, WebP, SVG, AVIF.`,
        },
        { status: 400 }
      );
    }

    // 4. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 5MB limit (provided ${(file.size / (1024 * 1024)).toFixed(2)} MB).`,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. If Supabase Storage is configured in environment
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseBucket = process.env.SUPABASE_STORAGE_BUCKET || 'product-images';

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        const ext = file.name.split('.').pop() || 'jpg';
        const uniqueFileName = `prod-${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from(supabaseBucket)
          .upload(uniqueFileName, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (!uploadError) {
          const { data: publicData } = supabase.storage
            .from(supabaseBucket)
            .getPublicUrl(uniqueFileName);

          return NextResponse.json({
            success: true,
            url: publicData.publicUrl,
            storage: 'supabase',
            filename: uniqueFileName,
            size: file.size,
            mimeType: file.type,
          });
        } else {
          console.error('Supabase storage upload error, falling back to local:', uploadError);
        }
      } catch (sbErr) {
        console.error('Supabase client error during upload:', sbErr);
      }
    }

    // 6. Local / Standard fallback storage
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const sanitizedBase = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const uniqueFileName = `${sanitizedBase}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      storage: 'local',
      filename: uniqueFileName,
      size: file.size,
      mimeType: file.type,
    });
  } catch (err: any) {
    console.error('File upload error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
