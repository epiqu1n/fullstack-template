import express, { ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import exampleRouter from './routes/example';
import path from 'path';
import { CustomError, error } from './utils/utils';
import CONFIG from './server.config.json';

/// Initialization
// Initialize config

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
type MiddlewareError = { msg: string, err: string | CustomError | Error, code?: number }
const globalErrorHandler: ErrorRequestHandler = function(info: MiddlewareError, req, res, next) {
  const { err, msg: message } = info;
  const code = (
    typeof info.code === 'number' ? info.code
    : info.err instanceof CustomError ? info.err.statusCode
    : 500
  );
  
  error(message);
  error(err.toString());
  return res.status(code).send({ error: message });
};
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
app.listen(CONFIG.port, () => {
  console.log(`Listening on port ${CONFIG.port}`);
});