import type { DocumentDate } from "./date";

export interface ActivityLogDocument {
  id: string;
  activityTypeId: string;
  data: Record<string, any>; // Dynamic fields based on activity type
  updatedAt?: DocumentDate;
  createdAt: DocumentDate;
}

export interface ActivityLogsResponse {
  activityLogs: ActivityLogDocument[];
  count: number;
}