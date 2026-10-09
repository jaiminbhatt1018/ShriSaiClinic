import React, { useState } from 'react';
import { Cpu, CheckCircle2, ChevronRight, X, ExternalLink } from 'lucide-react';

export const McpStatusBadge: React.FC = () => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      {/* Floating MCP Status Pill in bottom left (Hidden on mobile for patient focus) */}
      <aside 
        aria-label="Vite MCP Integration Status"
        className="fixed bottom-4 left-4 z-40 hidden md:block"
      >
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold shadow-lg backdrop-blur-md border border-slate-700/60 transition cursor-pointer hover:scale-105 active:scale-95"
          title="Click to view Vite MCP status"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-mono text-[11px] tracking-wide">Vite MCP Active</span>
        </button>
      </aside>

      {/* Detail Modal / Panel */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-slate-900 text-white border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white">
                  Vite MCP Integration
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Model Context Protocol
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              This project is configured with <code className="text-sky-300 font-mono">vite-plugin-mcp</code>, exposing real-time build and module graph telemetry directly to AI pair-programmers (Cursor, Antigravity, Claude Code, and Windsurf).
            </p>

            <div className="space-y-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4">
              <div className="flex justify-between items-center text-slate-400">
                <span>Transport:</span>
                <span className="text-emerald-400 font-semibold">SSE / Streamable HTTP</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Endpoint:</span>
                <span className="text-sky-300">/__mcp/sse</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Config Path:</span>
                <span className="text-slate-300">.agents/mcp_config.json</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 mb-5">
              <p className="font-bold text-slate-200">Active MCP Tools Provided:</p>
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><code className="text-slate-200 font-mono">get-vite-config</code> - Query Vite plugins &amp; environment</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><code className="text-slate-200 font-mono">get-vite-module-info</code> - Query module graph &amp; HMR</span>
              </div>
            </div>

            <button
              onClick={() => setShowDetail(false)}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
