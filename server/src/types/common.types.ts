export enum ErrorCode {
  USER_EXIST = 'USER_EXIST',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  SERVER_ERROR = 'SERVER_ERROR',
}

export enum ErrorMessage {
  USER_EXIST = 'User already exist',
  INVALID_CREDENTIALS = 'Invalid credentials',
  SERVER_ERROR = 'Server error',
}

export type ServiceResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    code: ErrorCode;
    message: ErrorMessage;
  };
};
