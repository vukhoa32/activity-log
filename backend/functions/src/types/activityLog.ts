export interface ActivityLog {
  id: string;
  activityTypeId: string;
  data: Record<string, any>; // Dynamic fields based on activity type
  timestamp: Date;
  createdAt: Date;
}

export interface ActivityLogDocument {
  activityTypeId: string;
  data: Record<string, any>;
  timestamp: Date;
  createdAt: Date;
}
