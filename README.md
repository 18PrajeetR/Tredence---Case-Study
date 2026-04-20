# 🧠 HR Workflow Designer (React + React Flow)

---

## 🚀 Overview

This project is a **mini HR Workflow Designer** that enables administrators to visually create, configure, and simulate internal workflows such as onboarding, leave approvals, and document verification.

The system is built with a focus on **modularity, scalability, and real-world product thinking**, combining a visual workflow builder with dynamic configuration and execution simulation.

---

## ✨ Key Highlights

* ⚡ Drag-and-drop workflow builder using React Flow
* 🧩 Multiple configurable node types (Start, Task, Approval, Automated, End)
* 🧠 Schema-driven dynamic forms for node configuration
* 🔌 Mock API integration for automation actions
* 🧪 Workflow simulation engine with validation
* 🏗️ Clean modular architecture (canvas, nodes, forms, API separated)
* 🎯 Designed for extensibility and scalability

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
* Dynamic parameters based on selected action

### 🔹 End Node

* End message
* Summary flag (boolean)

---

## 🔌 Mock API Layer

### GET /automations

```json
[
  { "id": "send_email", "label": "Send Email", "params": ["to", "subject"] },
  { "id": "generate_doc", "label": "Generate Document", "params": ["template", "recipient"] }
]
```

---

### POST /simulate

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
├── components/         # Shared UI components
├── features/
│   └── workflow/
│       ├── canvas/     # React Flow canvas logic
│       ├── nodes/      # Custom nodes + registry
│       ├── forms/      # Dynamic form system
│       ├── simulation/ # Execution logs panel
```

---

## 🎯 Example Workflow

```
Start → Task → Approval → Automated → End
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/18PrajeetR/Tredence---Case-Study.git
cd hr-workflow-designer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 🧪 How to Use

1. Drag nodes from the sidebar onto the canvas
2. Connect nodes to form a workflow
3. Click a node to configure it
4. Click **Run Workflow**
5. View execution logs

---

## 📌 Assumptions

* Linear workflow execution
* No backend persistence
* Mock APIs used
* Focus on architecture over UI perfection

---

## 🚀 Future Improvements

* Undo / Redo
* Workflow export/import
* Visual validation indicators
* Auto-layout
* Node templates
* Execution animation

---

## 💡 What This Demonstrates

* Strong understanding of React Flow
* Scalable front-end architecture
* Dynamic form handling
* API-driven UI design
* Workflow simulation logic

---

## 🏁 Conclusion

This project reflects a **product-oriented engineering approach**, emphasizing modularity, extensibility, and real-world usability.
