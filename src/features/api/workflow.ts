export const simulateWorkflowAPI = async (workflow: any) => {
  return new Promise<{ logs: string[] }>((resolve) => {
    setTimeout(() => {
      const logs: string[] = [];

      const nodes = workflow.nodes;
      const edges = workflow.edges;

      /* ---------------- VALIDATION ---------------- */

      const startNodes = nodes.filter((n: any) => n.type === "start");

      if (startNodes.length === 0) {
        resolve({ logs: ["❌ No Start Node found"] });
        return;
      }

      if (startNodes.length > 1) {
        resolve({ logs: ["❌ Multiple Start Nodes not allowed"] });
        return;
      }

      const connectedNodeIds = new Set([
        ...edges.map((e: any) => e.source),
        ...edges.map((e: any) => e.target),
      ]);

      const disconnected = nodes.filter(
        (n: any) => n.type !== "start" && !connectedNodeIds.has(n.id)
      );

      if (disconnected.length > 0) {
        resolve({ logs: ["❌ Some nodes are not connected"] });
        return;
      }

      /* ---------------- EXECUTION ---------------- */

      let current = startNodes[0];
      const visited = new Set();

      logs.push("🚀 START: Workflow initiated");

      while (current) {
        if (visited.has(current.id)) {
          logs.push("⚠️ Cycle detected. Stopping execution.");
          break;
        }

        visited.add(current.id);

        let log = "";

        switch (current.type) {
          case "start":
            log = "START: Entry point reached";
            break;

          case "task":
            log = `TASK: ${current.data.title || current.data.label}`;

            if (current.data.assignee) {
              log += ` | Assigned to: ${current.data.assignee}`;
            }

            if (current.data.dueDate) {
              log += ` | Due: ${current.data.dueDate}`;
            }

            break;

          case "approval":
            log = `APPROVAL: ${current.data.title || "Approval Step"}`;

            log += ` | Approver: ${
              current.data.approverRole || "N/A"
            }`;

            if (current.data.threshold) {
              log += ` | Threshold: ${current.data.threshold}`;
            }

            break;

          case "automated":
            log = `AUTOMATED: ${current.data.title || "Automation Step"}`;

            log += ` | Action: ${current.data.action || "N/A"}`;

            // 🔥 NEW: include dynamic params
            if (current.data.params) {
              const paramStr = Object.entries(current.data.params)
                .map(([k, v]) => `${k}: ${v}`)
                .join(", ");

              log += ` | Params: ${paramStr}`;
            }

            break;

          case "end":
            log = `🏁 END: ${
              current.data.message || "Workflow completed"
            }`;

            if (current.data.summary) {
              log += " | Summary Enabled";
            }

            logs.push(log);
            resolve({ logs });
            return;

          default:
            log = "UNKNOWN NODE";
        }

        logs.push(log);

        const edge = edges.find((e: any) => e.source === current.id);
        if (!edge) break;

        current = nodes.find((n: any) => n.id === edge.target);
      }

      logs.push("✅ Execution finished");

      resolve({ logs });
    }, 500);
  });
};

export const getAutomationsAPI = async () => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "send_email",
          label: "Send Email",
          params: ["to", "subject"],
        },
        {
          id: "generate_doc",
          label: "Generate Document",
          params: ["template", "recipient"],
        },
      ]);
    }, 300);
  });
};