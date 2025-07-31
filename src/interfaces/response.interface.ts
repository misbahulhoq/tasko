export interface Response<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
