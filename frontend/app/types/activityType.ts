export type FieldDefinition = {
  fieldName: string;
  fieldType: 'text' | 'number' | 'date' | 'boolean' | 'select';
  required: boolean;
  description?: string;
  options?: string[]; // For select type fields
  defaultValue?: any;
};

export type ActivityType = {
  id: string;
  label: string;
  description?: string;
  fields: FieldDefinition[];
};

export interface ActivityTypesResponse {
  activityTypes: ActivityType[];
  count: number;
}