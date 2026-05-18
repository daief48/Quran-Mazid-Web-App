import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import surahRoutes from './routes/surahRoutes.ts';
import searchRoutes from './routes/searchRoutes.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import { CONFIG } from './config/index.ts';

import { connectDB } from './db/index.ts';

const app = new Hono();

// Connect to MongoDB
connectDB();

// Global Middleware
app.use('*', logger());
app.use('*', cors({ origin: '*' }));
app.use('*', errorHandler as any);

// Health Check
app.get('/api/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

// API Routes
app.route('/api/surahs', surahRoutes);
app.route('/api/search', searchRoutes);

console.log(`🚀 Hono Backend server running on http://localhost:${CONFIG.PORT}`);

serve({
  fetch: app.fetch,
  port: CONFIG.PORT,
});
