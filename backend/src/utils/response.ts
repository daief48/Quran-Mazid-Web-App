import { ApiResponse } from '../types/index.ts';

export function successResponse<T>(data: T, statusCode = 200): ApiResponse<T> {
  return {
    success: true,
    data,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}

export function errorResponse(error: string, statusCode = 500): ApiResponse<null> {
  return {
    success: false,
    error,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}
