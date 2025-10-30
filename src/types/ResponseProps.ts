export interface ResponseProps<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown;
}