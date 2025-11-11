type InputType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "select"
  | "checkbox"
  | "group"
  | "time";

interface Option {
  label: string;
  value: string | number;
}

export interface formDataType {
  label: string;
  name: string;
  type: InputType;
  value?: string | number | boolean;
  options?: (string[] | Option)[];
}

export interface ExtendedFormDataType extends formDataType {
  options?: Option[];
  fields?: ExtendedFormDataType[];
}
