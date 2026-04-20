import CustomNode from "./CustomNode";

export const nodeTypesMap = {
  start: CustomNode,
  task: CustomNode,
  approval: CustomNode,
  automated: CustomNode,
  end: CustomNode,
};