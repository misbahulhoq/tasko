export interface Response<T = null> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
