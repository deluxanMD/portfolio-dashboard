export enum ErrorCode {
  BAD_REQUEST = 400,
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
