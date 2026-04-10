<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Git Workflow

**Never commit directly to `main`.** All changes -- features, fixes, design updates, refactors -- must follow this workflow:

1. Create a feature branch from `main` (e.g. `feat/soften-palette`, `fix/api-timeout`)
2. Make changes and commit to the branch
3. Push the branch -- Vercel will automatically create a preview deployment
4. Share the preview URL with the user for review
5. Only merge to `main` after the user approves

This applies to every change, no matter how small. The `main` branch is the production branch -- Vercel deploys it automatically.
