import { ServerError } from '../utils/utils.js';

/** @typedef {import("express").RequestHandler} RequestHandler */

const exampleController = {};

/** @type {RequestHandler} */
exampleController.exampleMiddleware = (req, res, next) => {
  console.log('Hitting example middleware');
  res.locals.example = 'Example data';
  return next();
};

export default exampleController;