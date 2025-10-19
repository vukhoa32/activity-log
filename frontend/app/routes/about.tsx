import type { Route } from "./+types/about";

export default function About({ params }: Route.ComponentProps) {
  const { pid } = params;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">About Activity Log</h1>
      {pid && (
        <p className="mb-4 text-blue-600">
          Parameter ID: <strong>{pid}</strong>
        </p>
      )}
      <p className="mb-4">
        Activity Log is a modern application for creating, tracking, and visualizing your activities.
      </p>
      <p className="mb-4">
        With customizable activity types and powerful analytics, you can gain insights into your daily routines and habits.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-3">Features</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Create custom activity types with personalized fields</li>
        <li>Log activities with ease</li>
        <li>View and sort your logs in table format</li>
        <li>Organize logs by time periods</li>
        <li>Visualize data with analytics charts</li>
      </ul>
    </div>
  );
}
