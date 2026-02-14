export enum ErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum ErrorMessage {
  USER_EXIST = 'User already exist',
  USER_NOT_FOUND = 'User not found',
  ASSET_NOT_FOUND = 'Asset not found',
  INVALID_CREDENTIALS = 'Invalid credentials',
  UNAUTHORIZED = 'User not authenticated',
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
