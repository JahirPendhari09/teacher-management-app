import type { personalDetails } from "./static";

export type SingleRowProps = {
  title: string;
  value: string;
  isEditing: boolean;
  onLabelChange: (val: string) => void;
  onChange: (val: string) => void;
  onRemove: () => void;
};

export type EditableSectionProps = {
  title: string;
  sectionKey?: keyof typeof personalDetails;
  isArray?: boolean;
  fields: FieldType[];
};

export type FieldType = {
  key: string;
  label: string;
  value: string;
};

export type Qualification = {
  name: string;
  rate: string;
};

export type EditableTableProps = {
  title: string;
  data: Qualification[];
  onSave: (updated: Qualification[]) => void;
};