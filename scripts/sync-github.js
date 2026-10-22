const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd, options = {}) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: options.silent ? 'pipe' : 'inherit', ...options });
  } catch (err) {
    if (options.ignoreError) return null;
    throw err;
  }
}

function runOutput(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (err) {
    return null;
  }
}

// Sensitive file patterns that must NEVER be committed
const SENSITIVE_PATTERNS = [
  /\.env(\.local|\.production|\.development)?$/i,
  /\.pem$/i,
  /\.key$/i,
  /id_rsa/i,
  /credentials/i,
  /secret/i,
];

async function syncToGithub() {
  console.log('====================================================');
  console.log('🚀 ANTIGRAVITY → GIT → GITHUB AUTOMATIC SYNC');
  console.log('====================================================\n');

  // 1. Check Git Repository Status
  const isGit = runOutput('git rev-parse --is-inside-work-tree');
  if (isGit !== 'true') {
    console.error('❌ Error: Current directory is not a Git repository.');
    process.exit(1);
  }

  const currentBranch = runOutput('git branch --show-current') || 'master';
  console.log(`📌 Active Branch: ${currentBranch}`);

  // 2. Check Remote Configuration
  const remoteUrl = runOutput('git remote get-url origin');
  if (!remoteUrl) {
    console.warn('⚠️ Warning: No Git remote "origin" is configured yet.');
    console.warn('👉 To connect GitHub, run: git remote add origin <your-github-repo-url>');
  } else {
    console.log(`🌐 Connected Remote: ${remoteUrl}`);
  }

  // 3. Inspect Working Tree
  const statusOutput = runOutput('git status --porcelain');
  if (!statusOutput) {
    console.log('✨ Working tree is completely clean. No pending changes to commit.');
    
    // Check if local branch is ahead of remote
    if (remoteUrl) {
      const aheadCount = runOutput(`git rev-list --count origin/${currentBranch}..${currentBranch}`);
      if (aheadCount && parseInt(aheadCount, 10) > 0) {
        console.log(`\n📤 Local branch is ahead by ${aheadCount} commit(s). Pushing to GitHub...`);
        run(`git push origin ${currentBranch}`);
        console.log('✅ Push successful! Local and remote are synchronized.');
      } else {
        console.log('✅ Local and remote branches are already fully synchronized.');
      }
    }
    return;
  }

  // 4. Safety Audit: Check for sensitive files
  const changedFiles = statusOutput
    .split('\n')
    .map(line => line.substring(3).trim());

  console.log(`📝 Detected ${changedFiles.length} modified/untracked file(s):`);
  changedFiles.forEach(f => console.log(`   - ${f}`));

  for (const file of changedFiles) {
    for (const pattern of SENSITIVE_PATTERNS) {
      if (pattern.test(file)) {
        console.error(`\n🚨 SECURITY ALERT: Attempted to stage potentially sensitive file: ${file}`);
        console.error('❌ Aborting commit. Please verify your .gitignore before proceeding.');
        process.exit(1);
      }
    }
  }

  // 5. Pre-Commit Validation Checks (Build & Test Suite)
  const skipValidation = process.argv.includes('--skip-validation');
  if (!skipValidation) {
    console.log('\n🧪 Running automated pre-commit validation suite...');
    try {
      run('node scripts/test-platform.js');
      console.log('✅ All automated tests passed!');
    } catch (err) {
      console.error('\n❌ Test suite failed. Fix the issues before syncing to GitHub.');
      process.exit(1);
    }

    console.log('\n🏗️ Verifying production Next.js build...');
    try {
      run('npm.cmd run build');
      console.log('✅ Production build succeeded!');
    } catch (err) {
      console.error('\n❌ Build failed. Fix the errors before syncing to GitHub.');
      process.exit(1);
    }
  } else {
    console.log('⚡ Skipping validation as requested (--skip-validation).');
  }

  // 6. Stage Intended Files
  console.log('\n📦 Staging changed files...');
  run('git add .');

  // 7. Commit Changes
  const customMessage = process.argv.find(arg => !arg.startsWith('--') && arg !== process.argv[0] && arg !== process.argv[1]);
  const commitMessage = customMessage || `chore: automated sync [${new Date().toISOString()}]`;

  console.log(`💬 Committing: "${commitMessage}"...`);
  run(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);

  const commitHash = runOutput('git rev-parse --short HEAD');
  console.log(`✅ Commit created: ${commitHash}`);

  // 8. Push to Remote if origin exists
  if (remoteUrl) {
    console.log(`\n🚀 Pushing to GitHub (${remoteUrl} [${currentBranch}])...`);
    try {
      run(`git push origin ${currentBranch}`);
      console.log('✅ Successfully pushed to GitHub!');
      console.log(`🎉 Repository is live and synchronized on branch: ${currentBranch}`);
    } catch (err) {
      console.error('\n❌ Git push failed. Authentication or permission issue.');
      console.error('👉 If this is your first push, please verify your GitHub credentials or SSH access.');
      process.exit(1);
    }
  } else {
    console.log('\nℹ️ Changes committed locally. To push to GitHub, add a remote:');
    console.log('   git remote add origin https://github.com/<your-username>/<your-repo>.git');
    console.log(`   git push -u origin ${currentBranch}`);
  }

  console.log('\n====================================================');
  console.log('🎯 SYNC COMPLETE');
  console.log(`📌 Branch: ${currentBranch}`);
  console.log(`📌 Commit: ${commitHash}`);
  console.log('====================================================\n');
}

syncToGithub().catch(err => {
  console.error('Fatal error during sync:', err);
  process.exit(1);
});
