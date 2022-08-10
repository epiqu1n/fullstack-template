import { RequestHandler } from 'express';
import { ClientError, ServerError } from '../utils/utils';

const exampleMiddleware: RequestHandler = (req, res, next) => {
  console.log('Hitting example middleware');
  res.locals.example = 'Example data';
  return next();
};

export default {
  exampleMiddleware
};