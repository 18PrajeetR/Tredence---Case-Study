export const nodeFormSchemas = {
  start: [
    { name: "title", label: "Start Title", type: "text" },
    { name: "metadata", label: "Metadata", type: "keyvalue" },
  ],

  task: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "assignee", label: "Assignee", type: "text" },
    { name: "dueDate", label: "Due Date", type: "date" },
    { name: "customFields", label: "Custom Fields", type: "keyvalue" },
  ],

  approval: [
    { name: "title", label: "Title", type: "text" },
    { name: "approverRole", label: "Approver Role", type: "text" },
    { name: "threshold", label: "Auto-Approve Threshold", type: "number" },
  ],

  automated: [
    { name: "title", label: "Title", type: "text" },
    { name: "action", label: "Action", type: "select" }, // API later
    { name: "params", label: "Parameters", type: "dynamic" },
  ],

  end: [
    { name: "message", label: "End Message", type: "text" },
    { name: "summary", label: "Summary Flag", type: "boolean" },
  ],
};