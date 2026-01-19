# Architecture

## Component structure

- `HomePage`
  - Fetches repository tree data using `buildGraph`.
  - Manages selected node, search filter, and loading/error state.
  - Layouts the header, tree view, and detail panel.
- `TreeView`
  - Builds a filtered subtree based on search.
  - Renders recursive `NodeRow` entries with expand/collapse behavior.
- `DetailPanel`
  - Shows metadata, README snippet, and GitHub link for the selected node.
- `SearchBar`
  - Provides a single search input for filtering the tree.

## UX direction (next milestone)

- Move from a pure tree browser toward an interactive map/landscape.
- Introduce grouped sections (e.g., cards by reference area) with direct links to GitHub locations.
- Keep the tree as a fallback or secondary view for deep navigation.

## Data flow

1. `buildGraph` calls GitHub's tree API and converts the flat list to a nested tree.
2. The root tree + nodes/edges are stored in state on `HomePage`.
3. The tree is filtered in `TreeView` based on the search query.
4. Selecting a node updates `DetailPanel` with name, path, and README snippet.

## Update strategy (MVP acceptance)

- The visualization should reflect repository changes automatically.
- Prefer a stable pipeline: a GitHub Actions job can prebuild a JSON tree artifact and the UI can load that file to avoid API limits.
- Avoid hardcoding BB categories/tags so new entries appear without code changes.

## Types

`src/types/bb.ts` defines `BBNode`, `BBEdge`, and `BBGraph` used across the app.
