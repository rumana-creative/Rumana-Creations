import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'nawabrumana6@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Rumana@nawab2026';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = (email || '').trim().toLowerCase();
    const targetEmail = ADMIN_EMAIL.trim().toLowerCase();

    // Verify both Administrator ID (Email) and Password
    const emailMatches = normalizedEmail === targetEmail;
    const passwordMatches = password === ADMIN_PASSWORD;

    if (!emailMatches || !passwordMatches) {
      return NextResponse.json(
        { success: false, error: 'Invalid administrative credentials. Please verify your ID and password.' },
        { status: 401 }
      );
    }

    const cookieStore = cookies();
    cookieStore.set('rc_admin_token', 'rc_authenticated_admin_session_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'Logged in successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete('rc_admin_token');
  return NextResponse.json({ success: true, message: 'Logged out' });
}
