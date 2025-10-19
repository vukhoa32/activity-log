export interface ActivityTypeDocument {
  id: string; // Custom identifier (e.g., "exercise", "reading")
  label: string; // Display name (e.g., "Exercise", "Reading")
  description?: string;
  fields: FieldDefinition[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FieldDefinition {
  fieldName: string;
  fieldType: 'text' | 'number' | 'date' | 'boolean' | 'select';
  required: boolean;
  description?: string;
  options?: string[]; // For select type fields
  defaultValue?: any;
}
