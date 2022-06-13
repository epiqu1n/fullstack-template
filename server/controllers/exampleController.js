import { ServerError } from '../utils/utils.js';

const exampleController = {};

/** @type {import("express").RequestHandler} */
exampleController.exampleMiddleware = (req, res, next) => {
  console.log('Hitting example middleware');
  res.locals.example = 'Example data';
  return next();
};

export default exampleController;