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

If you hit a 403 rate limit, the app automatically falls back to `/public/sample-tree.json` so the UI still renders. Replace that file with a newer sample if you want different offline data.

To view the full live repository tree, set `VITE_GITHUB_TOKEN` and reload the app so it can call the GitHub API without hitting rate limits.

### Local clone fallback (no GitHub API)

If GitHub API access is rate-limited, you can clone the repository locally and generate a tree file for the app to load without any API calls:

```bash
git clone https://github.com/CSA-FEDERATE/Proposed-BuildingBlocks.git
cd Proposed-BuildingBlocks
git ls-tree -r --name-only HEAD | python3 - <<'PY'
import json
import sys

paths = [line.strip() for line in sys.stdin if line.strip()]
tree = [{"path": path, "type": "blob", "sha": "local", "url": ""} for path in paths]
payload = {"sha": "local", "truncated": False, "tree": tree}
print(json.dumps(payload, indent=2))
PY
```

Save the output as `public/sample-tree.json` in this project and reload the app. It will use the local tree as the fallback data source.

## Data source

- Repository: https://github.com/CSA-FEDERATE/Proposed-BuildingBlocks
- API: `GET /repos/{owner}/{repo}/git/trees/{branch}?recursive=1`

## MVP acceptance criteria

1. The visualization updates when the GitHub repository updates.
2. Do not hardcode BB names/tags/categories because they may change.
3. Use a stable update pipeline (e.g., GitHub Actions to prebuild data or caching) to avoid API rate-limit issues.

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
