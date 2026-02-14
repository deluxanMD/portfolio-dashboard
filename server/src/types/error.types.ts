export interface SystemError extends Error {
  code?: string;
  syscall?: string;
  errno?: number;
}
