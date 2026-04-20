import { nodeFormSchemas } from "./schema";
import { useState, useEffect } from "react";
import { getAutomationsAPI } from "../../api/workflow";

export default function NodeConfigPanel({
  selectedNode,
  onUpdate,
}: any) {
  if (!selectedNode) return null;

  const schema = nodeFormSchemas[selectedNode.type];
  if (!schema) return null;

  /* ---------------- NEW: AUTOMATION STATE ---------------- */
  const [automations, setAutomations] = useState<any[]>([]);

  useEffect(() => {
    if (selectedNode.type === "automated") {
      getAutomationsAPI().then(setAutomations);
    }
  }, [selectedNode.type]);

  /* ---------------- FIELD RENDERER ---------------- */
  const renderField = (field: any) => {
    const value = selectedNode.data[field.name] || "";

    switch (field.type) {
      case "text":
        return (
          <input
            className="w-full border rounded px-2 py-1"
            value={value}
            onChange={(e) => onUpdate(field.name, e.target.value)}
          />
        );

      case "textarea":
        return (
          <textarea
            className="w-full border rounded px-2 py-1"
            value={value}
            onChange={(e) => onUpdate(field.name, e.target.value)}
          />
        );

      case "number":
        return (
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            value={value}
            onChange={(e) =>
              onUpdate(field.name, Number(e.target.value))
            }
          />
        );

      case "date":
        return (
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={value}
            onChange={(e) => onUpdate(field.name, e.target.value)}
          />
        );

      case "boolean":
        return (
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) =>
              onUpdate(field.name, e.target.checked)
            }
          />
        );

      case "keyvalue":
        return (
          <KeyValueEditor
            field={field}
            value={value}
            onUpdate={onUpdate}
          />
        );

      /* ---------------- UPDATED: SELECT (API BASED) ---------------- */
      case "select":
        return (
          <select
            className="w-full border rounded px-2 py-1"
            value={value}
            onChange={(e) => {
              const selected = automations.find(
                (a) => a.id === e.target.value
              );

              onUpdate("action", selected?.id);
              onUpdate("params", {}); // reset params
            }}
          >
            <option value="">Select action</option>
            {automations.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        );

      /* ---------------- NEW: DYNAMIC PARAMS ---------------- */
      case "dynamic":
        const selectedAction = automations.find(
          (a) => a.id === selectedNode.data.action
        );

        if (!selectedAction) {
          return (
            <p className="text-sm text-gray-400">
              Select action first
            </p>
          );
        }

        return (
          <div>
            {selectedAction.params.map((param: string) => (
              <div key={param} className="mb-2">
                <label className="text-xs text-gray-600">
                  {param}
                </label>
                <input
                  className="w-full border px-2 py-1 rounded"
                  value={
                    selectedNode.data.params?.[param] || ""
                  }
                  onChange={(e) => {
                    const updatedParams = {
                      ...selectedNode.data.params,
                      [param]: e.target.value,
                    };
                    onUpdate("params", updatedParams);
                  }}
                />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-80 bg-white border-l p-4 shadow">
      <h3 className="font-bold text-lg mb-4">Node Settings</h3>

      {schema.map((field: any) => (
        <div key={field.name} className="mb-4">
          <label className="block text-sm mb-1">
            {field.label}
          </label>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
}

/* ---------------- KEY VALUE EDITOR ---------------- */

function KeyValueEditor({
  field,
  value = {},
  onUpdate,
}: any) {
  const [entries, setEntries] = useState(
    Object.entries(value || {})
  );

  const updateEntry = (
    index: number,
    key: string,
    val: string
  ) => {
    const updated = [...entries];
    updated[index] = [key, val];
    setEntries(updated);

    const obj = Object.fromEntries(updated);
    onUpdate(field.name, obj);
  };

  const addEntry = () => {
    setEntries([...entries, ["", ""]]);
  };

  return (
    <div>
      {entries.map(([k, v]: any, i: number) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            placeholder="Key"
            className="border px-1"
            value={k}
            onChange={(e) =>
              updateEntry(i, e.target.value, v)
            }
          />
          <input
            placeholder="Value"
            className="border px-1"
            value={v}
            onChange={(e) =>
              updateEntry(i, k, e.target.value)
            }
          />
        </div>
      ))}

      <button
        onClick={addEntry}
        className="text-xs text-blue-600 mt-1"
      >
        + Add Field
      </button>
    </div>
  );
}