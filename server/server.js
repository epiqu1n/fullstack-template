import express from 'express';
import cookieParser from 'cookie-parser';
import exampleRouter from './routes/example.js';
import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { CustomError, error } from './utils/utils.js';

/// Initialization
// Initialize config
const __dirname = dirname(fileURLToPath(import.meta.url));
const _config = JSON.parse(await fs.readFile(path.join(__dirname, './server.config.json')));

// Set up application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use('/assets', express.static(path.resolve(__dirname, '../client')));
app.use('/', express.static(path.resolve(__dirname, '../dist')));

/// Routes
app.use('/api/example', exampleRouter);


// Catch-all
app.all('*', (req, res) => {
  return res.sendStatus(404);
});


// Global error handler
/**
 * @type {express.ErrorRequestHandler}
 * @param {Error | {msg: string, err?: Error, code?: number}} info
 */
function globalErrorHandler(info, req, res, next) {
  const err = (info instanceof Error ? info : info.err);
  const message = (info instanceof Error ? 'An unknown server error occurred' : info.msg);
  const code = (
    typeof info.code === 'number' ? info.code
    : info.err instanceof CustomError ? info.err.statusCode
    : 500
  );
  
  error(message);
  error(err);
  return res.status(code).send({ error: message });
}
app.use(globalErrorHandler);
/*
  next({
    // Message for client
    msg: 'Sorry stuff\'s borked :(',
    // Error to log
    err: new ServerError('apiController.exampleMiddleware: Error occurred in middleware I guess')
  });
*/


// Start server
app.listen(_config.port, () => {
  console.log(`Listening on port ${_config.port}`);
});