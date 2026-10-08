# Shri Sai Clinic - React (Vite + MCP)

A modern, high-performance React application for **Shri Sai Clinic** (Dr. Jay Bhatt, BHMS) featuring **Vite** with full **Model Context Protocol (MCP)** integration.

---

## ⚡ Model Context Protocol (MCP) Integration

This project is configured with [`vite-plugin-mcp`](https://github.com/antfu/nuxt-mcp-dev/tree/main/packages/vite-plugin-mcp), allowing AI assistants (Antigravity, Cursor, Claude Code, Windsurf) to introspect the live application and Vite build pipeline.

### MCP Server Details
- **Endpoint**: `http://localhost:5173/__mcp/sse`
- **Transport**: SSE / Streamable HTTP
- **Config Files**:
  - Antigravity: [`.agents/mcp_config.json`](./.agents/mcp_config.json)
  - Claude Code / Universal: [`.mcp.json`](./.mcp.json)
  - Cursor: [`.cursor/mcp.json`](./.cursor/mcp.json)
  - VS Code: [`.vscode/mcp.json`](./.vscode/mcp.json)

### Available MCP Tools
- **`get-vite-config`**: Fetches Vite configuration digests, environment names, root paths, and active plugins.
- **`get-vite-module-info`**: Inspects module graphs, dependencies, importers, compiled outputs, and HMR timestamps for any file.

---

## 🏥 Clinical Web Features Included

1. **Header & Navigation**: Responsive sticky navigation with mobile drawer and direct WhatsApp integration.
2. **Hero Section**: Showcasing Dr. Jay Bhatt (BHMS) with trust metrics and consultation booking hooks.
3. **Animated Stats Counter**: Micro-animated counters for clinical practice years, patients treated, relief rate, and 100% non-steroidal care.
4. **Interactive Before & After Split Slider**: Accessible slider comparing real patient recovery (Scalp Psoriasis, Neck Skin Tags, Alopecia Areata, and Seborrheic Dermatitis).
5. **Specialized Departments Grid**: Filterable clinical therapies (Skin & Hair, Chronic Conditions, Women & Child Health).
6. **Physician Profile**: Clinical philosophy and credentials of Dr. Jay Bhatt.
7. **Unified Appointment Scheduler**: OPD timetable (Morning, Evening, Sunday), token generation (`SSC-2026-XXXX`), printable consultation slip, and one-click WhatsApp forwarding.
8. **Patient Testimonials & FAQs**: 5.0-star reviews and accordion answers to patient questions.
9. **Live Vite MCP Status Badge**: Real-time indicator displaying active MCP status and tool information.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server with Vite MCP
```bash
npm run dev
```
The application will start on `http://localhost:5173` with the MCP server active at `http://localhost:5173/__mcp/sse`.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
