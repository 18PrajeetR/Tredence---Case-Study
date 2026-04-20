export type NodeType =
  | "start"
  | "task"
  | "approval"
  | "automated"
  | "end";

export interface BaseNodeData {
  label: string;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  data: BaseNodeData;
}