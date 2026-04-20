import { Handle, Position } from "reactflow";

export default function CustomNode({ data }: any) {
  return (
    <div className="px-4 py-2 border rounded bg-white shadow text-sm">
      <Handle type="target" position={Position.Top} />
      
      <div>{data.label}</div>
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}