const nodeTypes = [
  { type: "start", label: "Start" },
  { type: "task", label: "Task" },
  { type: "approval", label: "Approval" },
  { type: "automated", label: "Automated" },
  { type: "end", label: "End" },
];

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
  <div className="w-56 bg-white border-r p-4">
  <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
    Node Types
  </h3>

  {nodeTypes.map((node) => (
    <div
      key={node.type}
      onDragStart={(e) => onDragStart(e, node.type)}
      draggable
      className="p-2 mb-2 bg-gray-50 hover:bg-gray-100 border rounded-md cursor-grab text-sm transition"
    >
      {node.label}
    </div>
  ))}
</div>
  );
}