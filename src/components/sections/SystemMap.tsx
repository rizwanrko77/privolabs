import React, { useState, useEffect } from 'react';

const nodes = [
  { id: 'data', x: 20, y: 50, label: 'Data & ML', desc: 'Ingestion and training' },
  { id: 'llm', x: 50, y: 20, label: 'LLM Engine', desc: 'Reasoning core' },
  { id: 'agent', x: 80, y: 50, label: 'Agent Workflow', desc: 'Autonomous execution' },
  { id: 'ui', x: 50, y: 80, label: 'Platform UI', desc: 'Human-in-the-loop' }
];

const paths = [
  { source: 'data', target: 'llm' },
  { source: 'llm', target: 'agent' },
  { source: 'agent', target: 'ui' },
  { source: 'ui', target: 'data' }
];

export default function SystemMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [pulse, setPulse] = useState(false);

  // Trigger ambient pulse on paths
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="system-map" aria-label="Interactive map of our AI system architecture">
      {/* SVG Canvas for lines */}
      <svg className="system-map-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {paths.map((path, idx) => {
          const s = nodes.find(n => n.id === path.source)!;
          const t = nodes.find(n => n.id === path.target)!;
          const isActive = activeNode === s.id || activeNode === t.id;
          
          return (
            <line
              key={idx}
              x1={s.x} y1={s.y}
              x2={t.x} y2={t.y}
              stroke={isActive ? 'var(--brand-500)' : 'var(--rule)'}
              strokeWidth="0.5"
              className={pulse ? 'pulse-line' : ''}
            />
          );
        })}
      </svg>

      {/* HTML Nodes for accessibility and interaction */}
      {nodes.map(node => (
        <button
          key={node.id}
          className={`system-node ${activeNode === node.id ? 'active' : ''}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onMouseEnter={() => setActiveNode(node.id)}
          onMouseLeave={() => setActiveNode(null)}
          onFocus={() => setActiveNode(node.id)}
          onBlur={() => setActiveNode(null)}
        >
          <div className="node-dot"></div>
          <div className="node-info">
            <span className="node-label font-mono">{node.label}</span>
            <span className="node-desc text-muted">{node.desc}</span>
          </div>
        </button>
      ))}

      <style>{`
        .system-map {
          position: relative;
          width: 100%;
          height: 600px;
          background: var(--surface-raised);
          border: 1px solid var(--rule);
          border-radius: var(--r-md);
          overflow: hidden;
        }
        .system-map-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .pulse-line {
          transition: stroke 1.5s var(--ease-out);
        }
        .system-node {
          position: absolute;
          transform: translate(-50%, -50%);
          background: none;
          border: none;
          padding: var(--s-4);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--s-3);
          transition: transform var(--t-fast) var(--ease-snap);
        }
        .system-node:hover, .system-node:focus-visible {
          transform: translate(-50%, -50%) scale(1.05);
          outline: none;
        }
        .node-dot {
          width: 12px;
          height: 12px;
          background: var(--surface);
          border: 2px solid var(--text);
          border-radius: 50%;
          transition: border-color var(--t-fast) var(--ease-out), box-shadow var(--t-fast) var(--ease-out);
        }
        .system-node.active .node-dot {
          border-color: var(--brand-500);
          box-shadow: 0 0 0 4px rgb(255 74 23 / 0.2);
        }
        .node-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--surface);
          padding: var(--s-2) var(--s-4);
          border: 1px solid var(--rule);
          border-radius: var(--r-sm);
          opacity: 0.7;
          transition: opacity var(--t-fast) var(--ease-out), border-color var(--t-fast) var(--ease-out);
        }
        .system-node.active .node-info {
          opacity: 1;
          border-color: var(--brand-500);
        }
        .node-label {
          font-size: var(--label);
          font-weight: 600;
          color: var(--text);
          text-transform: uppercase;
        }
        .node-desc {
          font-size: var(--small);
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
