# RUMANA CREATIONS — AGENT INSTRUCTIONS & AUTOMATIC GIT WORKFLOW

These guidelines are active for this repository and govern all coding sessions in this workspace.

---

## 🌸 Brand & Architecture Principles
- **Preserve Existing Architecture:** Do not rebuild, re-architect, or replace working components unnecessarily.
- **Brand Identity:** Warm Ivory (`#FFFDF8`), Champagne Cream (`#F7F0E5`), Royal Deep Burgundy (`#70152C`), Antique Metallic Gold (`#C49A45`), Blush Pink (`#F3DDE1`), and Warm Charcoal (`#393333`). Preserved official logo at `/public/rumana-logo.png`.
- **Navigation Bar:** Fixed to the 5 requested core links: `Home`, `Product`, `Best Seller`, `About`, and `Contact`.
- **Product Classification:** All jewellery items are strictly artificial / costume / fashion jewellery with non-precious disclosures. Patterned clips are classified under hair accessories (never as nail products).

---

## 🚀 Mandatory Post-Task Git & GitHub Synchronization Workflow

After completing ANY code change, bug fix, or feature request:

### 1. Verification & Security Pre-Flight
- Run the validation test suite: `node scripts/test-platform.js`
- Verify the production build: `npm.cmd run build`
- Ensure zero secrets, private keys, `.env*` files, or passwords are staged or committed.

### 2. Staging & Committing
- Check `git status --short`.
- Stage only intended repository files (`git add .` or selective staging, respecting `.gitignore`).
- Create a clear, descriptive commit message based on the actual changes:
  `git commit -m "<type>(<scope>): <concise description>"`

### 3. GitHub Push & Synchronization
- If a remote `origin` is configured, push the commit to the active branch:
  `git push origin <branch>`
- Never use `--force` or `--force-with-lease` automatically.
- Never rewrite git history destructively.

### 4. Completion Report
Always conclude by reporting:
- **Commit Hash:** e.g. `a1b2c3d`
- **Active Branch:** e.g. `master` or `main`
- **Changed Files:** List of files modified or created
- **Validation Results:** Test suite and build status
- **Push Status:** Remote synchronization confirmation
