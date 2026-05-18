import { Context, Next } from 'hono';
import { errorResponse } from '../utils/response.ts';
import { HTTPException } from 'hono/http-exception';

export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    console.error('API Error:', err);

    if (err instanceof HTTPException) {
      return c.json(errorResponse(err.message, err.status), err.status);
    }

    const message = err.message || 'Internal Server Error';
    const status = err.status || (message.includes('Invalid') ? 400 : 500);

    return c.json(errorResponse(message, status), status as any);
  }
}
