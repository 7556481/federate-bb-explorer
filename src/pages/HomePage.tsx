import { useEffect, useMemo, useState } from "react";
import { DetailPanel } from "../components/DetailPanel";
import { SearchBar } from "../components/SearchBar";
import { TreeView } from "../components/TreeView";
import { buildGraph, getRepoMeta } from "../lib/github";
import type { BBGraph, BBNode, RepoMeta } from "../types/bb";

export const HomePage = () => {
  const [graph, setGraph] = useState<BBGraph | null>(null);
  const [selected, setSelected] = useState<BBNode | undefined>();
  const [filter, setFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const meta: RepoMeta = useMemo(() => getRepoMeta(), []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await buildGraph(meta);
        setGraph(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [meta]);

  if (loading) {
    return <div className="state">Loading Building Blocks...</div>;
  }

  if (error) {
    return (
      <div className="state state--error">
        Failed to load data. {error}
        <div>Tip: configure VITE_GITHUB_TOKEN for higher GitHub API limits.</div>
      </div>
    );
  }

  if (!graph) {
    return <div className="state">No data available.</div>;
  }

  return (
    <div className="layout">
      <header className="header">
        <div>
          <h1>FEDERATE Building Block Explorer</h1>
          <p>Clickable overview of the FEDERATE Building Block landscape.</p>
        </div>
        <SearchBar value={filter} onChange={setFilter} />
      </header>
      <main className="main">
        <section className="tree-panel">
          <TreeView root={graph.root} filter={filter} onSelect={setSelected} />
        </section>
        <aside className="detail-panel-wrapper">
          <DetailPanel node={selected} meta={meta} />
        </aside>
      </main>
    </div>
  );
};
