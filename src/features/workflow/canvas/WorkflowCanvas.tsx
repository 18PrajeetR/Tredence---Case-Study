import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import { useRef, useCallback, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { nodeTypesMap } from "../nodes/registry";
import NodeConfigPanel from "../forms/NodeConfigPanel";
import SimulationPanel from "../simulation/SimulationPanel";
import { simulateWorkflowAPI } from "../../api/workflow";

const initialNodes = [
  {
    id: "1",
    type: "start",
    position: { x: 100, y: 100 },
    data: { label: "Start Node" },
  },
];

const initialEdges: any[] = [];

/* ---------------- INNER COMPONENT ---------------- */
function WorkflowCanvasInner() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!bounds) return;

      const position = screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode = {
        id: Date.now().toString(),
        type: type,
        position,
        data: { label: `${type.toUpperCase()} NODE` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (_: any, node: any) => {
    setSelectedNode(node);
  };

  const updateNodeData = (key: string, value: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                [key]: value,
              },
            }
          : node
      )
    );

    setSelectedNode((prev: any) => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: value,
      },
    }));
  };

  /* ---------------- SIMULATION ---------------- */
  const simulateWorkflow = async () => {
    const workflowJSON = { nodes, edges };

    try {
      const response = await simulateWorkflowAPI(workflowJSON);
      setLogs(response.logs);
    } catch (err) {
      console.error(err);
      alert("Simulation failed");
    }
  };

  /* ---------------- DELETE HANDLER FIX ---------------- */
  const handleNodesChange = useCallback(
    (changes: any) => {
      onNodesChange(changes);

      changes.forEach((change: any) => {
        if (change.type === "remove" && selectedNode?.id === change.id) {
          setSelectedNode(null);
        }
      });
    },
    [onNodesChange, selectedNode]
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      
      {/* 🔥 HEADER */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 shadow-sm">
        <div className="font-semibold text-lg">
          HR Workflow Designer
        </div>

        <button
          onClick={simulateWorkflow}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Run Workflow
        </button>
      </div>

      {/* 🔥 MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* Canvas */}
        <div
          ref={reactFlowWrapper}
          className="flex-1 bg-gray-100"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={() => setSelectedNode(null)}  // 🔥 UX polish
            nodeTypes={nodeTypesMap}
            fitView
            deleteKeyCode={["Backspace", "Delete"]}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>

        {/* Right Panels */}
        <NodeConfigPanel
          selectedNode={selectedNode}
          onUpdate={updateNodeData}
        />

        <SimulationPanel logs={logs} />
      </div>
    </div>
  );
}

/* ---------------- WRAPPER ---------------- */
export default function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner />
    </ReactFlowProvider>
  );
}