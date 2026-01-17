# FEDERATE Building Block Explorer

This project provides a clickable hierarchy view of the FEDERATE Building Block (BB) landscape from the CSA-FEDERATE/Proposed-BuildingBlocks repository.

## Tech stack

- Vite + React + TypeScript
- GitHub API for repository tree + README snippets

## Local development

```bash
npm install
npm run dev
```

### Optional GitHub token

GitHub API requests are subject to rate limits. To increase the limit, create a token and set:

```bash
VITE_GITHUB_TOKEN=your_token_here
```

## Data source

- Repository: https://github.com/CSA-FEDERATE/Proposed-BuildingBlocks
- API: `GET /repos/{owner}/{repo}/git/trees/{branch}?recursive=1`

## Updating data

The app loads data at runtime from GitHub. No manual regeneration is required. If you want to change the source, edit `src/lib/github.ts` (owner, repo, branch).

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Create a new Vercel project linked to the repo.
3. Set `VITE_GITHUB_TOKEN` as an environment variable if you want higher API limits.
4. Deploy.

## Project structure

```
/public
/docs
/src/components
/src/pages
/src/lib
/src/types
```

See `docs/architecture.md` for component and data flow details.
