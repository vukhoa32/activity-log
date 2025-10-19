import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useState, useEffect } from "react";
import type { ActivityLogDocument, ActivityLogsResponse } from "~/types/activityLog";
import type { ActivityType, ActivityTypesResponse, FieldDefinition } from "~/types/activityType";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const OldHome = () => {
  return <Welcome />;
}

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLogDocument[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('http://127.0.0.1:5001/activity-log-khoavu/us-central1/getActivityTypes')
        .then(res => res.json() as Promise<ActivityTypesResponse>),
      fetch('http://127.0.0.1:5001/activity-log-khoavu/us-central1/getActivityLogs')
        .then(res => res.json() as Promise<ActivityLogsResponse>)
    ])
      .then(([typesData, logsData]) => {
        const activityTypes = typesData.activityTypes;

        // Extract unique field names from all activity types
        const uniqueFieldNames: string[] = [];
        activityTypes.forEach((activityType: ActivityType) => {
          if (activityType.fields && Array.isArray(activityType.fields)) {
            activityType.fields.forEach((field: FieldDefinition) => {
              if (field.fieldName) {
                uniqueFieldNames.push(field.fieldName);
              }
            });
          }
        });

        setColumns(Array.from(uniqueFieldNames));
        setData(activityTypes);
        setActivityLogs(logsData.activityLogs);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
      
      {activityLogs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Activity Type</th>
                {columns.map(column => (
                  <th key={column} className="border border-gray-300 px-4 py-2">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activityLogs.map((log, index) => (
                <tr key={log.id || index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{log.activityTypeId}</td>
                  {columns.map(column => (
                    <td key={column} className="border border-gray-300 px-4 py-2">
                      {log.data?.[column] !== undefined ? String(log.data[column]) : '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No activity logs found.</p>
      )}
    </div>
  );
}
