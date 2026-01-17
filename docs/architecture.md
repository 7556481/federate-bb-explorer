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

## Data flow

1. `buildGraph` calls GitHub's tree API and converts the flat list to a nested tree.
2. The root tree + nodes/edges are stored in state on `HomePage`.
3. The tree is filtered in `TreeView` based on the search query.
4. Selecting a node updates `DetailPanel` with name, path, and README snippet.

## Types

`src/types/bb.ts` defines `BBNode`, `BBEdge`, and `BBGraph` used across the app.
