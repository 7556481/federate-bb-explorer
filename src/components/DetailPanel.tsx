import type { BBNode, RepoMeta } from "../types/bb";

interface DetailPanelProps {
  node?: BBNode;
  meta: RepoMeta;
}

export const DetailPanel = ({ node, meta }: DetailPanelProps) => {
  if (!node) {
    return (
      <div className="detail-panel__empty">
        Select a Building Block folder or file to view details.
      </div>
    );
  }

  const link = node.path
    ? `${meta.baseUrl}/tree/${meta.branch}/${node.path}`
    : meta.baseUrl;

  return (
    <div className="detail-panel">
      <h2>{node.name}</h2>
      <div className="detail-panel__meta">
        <div>
          <strong>Path:</strong> {node.path || "/"}
        </div>
        <div>
          <strong>Type:</strong> {node.type}
        </div>
      </div>
      {node.readmeSnippet && (
        <pre className="detail-panel__snippet">{node.readmeSnippet}</pre>
      )}
      <a href={link} target="_blank" rel="noreferrer">
        View on GitHub
      </a>
    </div>
  );
};
