# 🧠 HR Workflow Designer (React + React Flow)

## 🚀 Overview

This project is a **mini HR Workflow Designer** that enables administrators to visually create, configure, and simulate internal workflows such as onboarding, leave approvals, and document verification.

The system is built with a focus on **modularity, scalability, and real-world product thinking**, combining a visual workflow builder with dynamic configuration and execution simulation.

---

## ✨ Key Highlights

* ⚡ **Drag-and-drop workflow builder** using React Flow
* 🧩 **Multiple configurable node types** (Start, Task, Approval, Automated, End)
* 🧠 **Schema-driven dynamic forms** for node configuration
* 🔌 **Mock API integration** for automation actions
* 🧪 **Workflow simulation engine** with validation
* 🏗️ **Clean modular architecture** (canvas, nodes, forms, API separated)
* 🎯 Designed with **extensibility and real-world scalability in mind**

---

## 🧩 Node Types Supported

### 🔹 Start Node

* Start title
* Metadata (key-value pairs)

### 🔹 Task Node

* Title (required)
* Description
* Assignee
* Due date
* Custom fields

### 🔹 Approval Node

* Title
* Approver role (Manager, HRBP, etc.)
* Auto-approve threshold

### 🔹 Automated Node

* Title
* Action (fetched dynamically from API)
* Dynamic parameters (based on selected action)

### 🔹 End Node

* End message
* Summary flag (boolean)

---

## 🔌 Mock API Layer

### `GET /automations`

Returns automation actions:

```json
[
  { "id": "send_email", "label": "Send Email", "params": ["to", "subject"] },
  { "id": "generate_doc", "label": "Generate Document", "params": ["template", "recipient"] }
]
```

### `POST /simulate`

* Accepts workflow graph (nodes + edges)
* Returns step-by-step execution logs

---

## 🧪 Workflow Simulation

The system includes a **sandbox execution engine** that:

* Serializes the workflow graph
* Validates:

  * Single Start Node
  * Graph connectivity
  * Cycle detection
* Executes nodes sequentially
* Displays structured execution logs

---

## 🏗️ Architecture

```plaintext
src/
├── api/                # Mock API layer
├── components/         # Shared UI components (Sidebar, etc.)
├── features/
│   └── workflow/
│       ├── canvas/     # React Flow integration + state
│       ├── nodes/      # Custom node components + registry
│       ├── forms/      # Schema-driven dynamic forms
│       ├── simulation/ # Execution panel + logs
├── types/              # Type definitions (optional)
```

---

## 🧠 Design Decisions

### 🔹 Schema-Driven Forms

Node configuration is defined using schemas, allowing:

* Easy extension for new node types
* Minimal code duplication
* Dynamic UI rendering

### 🔹 Node Registry Pattern

Each node type is registered and rendered dynamically, making the system scalable and modular.

### 🔹 API Abstraction

All external logic (automation + simulation) is handled via a mock API layer, ensuring:

* Separation of concerns
* Async handling
* Real-world extensibility

### 🔹 State Management Strategy

* React Flow manages graph state
* Node data is co-located and updated immutably
* UI panels reflect live node state

---

## 🎯 Example Workflow

```plaintext
Start → Task → Approval → Automated → End
```

### Sample Execution Output

* START: Entry point reached
* TASK: Assigned to HR | Due: 2026-04-20
* APPROVAL: Manager approval required
* AUTOMATED: Send Email (to, subject)
* END: Workflow completed

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd hr-workflow-designer
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run the application

```bash
npm run dev
```

---

### 4. Open in browser

```bash
http://localhost:5173
```

---

## 🧪 How to Use

1. Drag nodes from the sidebar onto the canvas
2. Connect nodes to form a workflow
3. Click any node to configure it
4. Use the **Run Workflow** button
5. View execution logs in the simulation panel

---

## 📌 Assumptions

* Linear workflows (single execution path)
* No backend persistence required
* Mock APIs used instead of real services
* Focus on architecture and functionality over pixel-perfect UI

---

## 🚀 Future Improvements

* Undo / Redo support
* Workflow export/import (JSON)
* Visual validation indicators
* Auto-layout of nodes
* Node templates
* Execution animation timeline
* Backend persistence

---

## 💡 What This Demonstrates

* Strong understanding of **React Flow and graph-based UIs**
* Ability to design **scalable front-end architecture**
* Experience with **dynamic forms and controlled components**
* API-driven UI development
* Workflow simulation and validation logic

---

## 🏁 Conclusion

This project reflects a **product-oriented engineering approach**, focusing not just on functionality but also on extensibility, modularity, and real-world usability.

---
