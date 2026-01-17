import { useMemo, useState } from "react";
import type { BBNode } from "../types/bb";

interface TreeViewProps {
  root: BBNode;
  onSelect: (node: BBNode) => void;
  filter: string;
}

const matchesFilter = (node: BBNode, filter: string): boolean => {
  if (!filter) {
    return true;
  }
  return node.name.toLowerCase().includes(filter.toLowerCase());
};

const filterTree = (node: BBNode, filter: string): BBNode | null => {
  if (!filter) {
    return node;
  }
  const children = node.children
    ?.map((child) => filterTree(child, filter))
    .filter((child): child is BBNode => Boolean(child));

  if (matchesFilter(node, filter) || (children && children.length > 0)) {
    return { ...node, children };
  }
  return null;
};

const NodeRow = ({
  node,
  depth,
  onSelect,
}: {
  node: BBNode;
  depth: number;
  onSelect: (node: BBNode) => void;
}) => {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = (node.children?.length ?? 0) > 0;

  return (
    <div className="tree-node">
      <button
        type="button"
        className="tree-node__row"
        onClick={() => onSelect(node)}
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        {hasChildren ? (
          <span
            className="tree-node__toggle"
            onClick={(event) => {
              event.stopPropagation();
              setExpanded((prev) => !prev);
            }}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? "▾" : "▸"}
          </span>
        ) : (
          <span className="tree-node__toggle" />
        )}
        <span className={node.type === "tree" ? "tree-node__folder" : "tree-node__file"}>
          {node.name}
        </span>
      </button>
      {expanded &&
        node.children?.map((child) => (
          <NodeRow key={child.id} node={child} depth={depth + 1} onSelect={onSelect} />
        ))}
    </div>
  );
};

export const TreeView = ({ root, onSelect, filter }: TreeViewProps) => {
  const filtered = useMemo(() => filterTree(root, filter), [root, filter]);

  if (!filtered) {
    return <div className="tree-empty">No matching nodes.</div>;
  }

  return (
    <div className="tree-view">
      {filtered.children?.map((child) => (
        <NodeRow key={child.id} node={child} depth={0} onSelect={onSelect} />
      ))}
    </div>
  );
};
