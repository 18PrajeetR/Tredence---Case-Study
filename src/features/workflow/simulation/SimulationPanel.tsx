export default function SimulationPanel({ logs }: any) {
  return (
    <div className="w-80 bg-white border-l p-4">
      <h3 className="text-lg font-semibold mb-4">Execution Log</h3>

      {logs.length === 0 ? (
        <p className="text-sm text-gray-400">Run workflow to see logs</p>
      ) : (
        <div className="space-y-2">
          {logs.map((log: string, i: number) => (
            <div
              key={i}
              className="p-2 text-sm bg-gray-50 border rounded"
            >
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}