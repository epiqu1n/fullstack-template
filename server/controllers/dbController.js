import { ServerError } from '../utils/utils.js';
import { ExampleModel } from '../models/exampleModels.js';

/** @typedef {import('express').RequestHandler} RequestHandler */
const dbController = {};

/**
 * Adds an Example to the database and stores the newly created Example into `res.locals.example`
 * @type {RequestHandler}
 */
dbController.addExample = async (req, res, next) => {
  if (typeof req.body.name !== 'string') return next({
    msg: 'Invalid JSON input',
    err: { message: 'dbController.addExample: Invalid JSON input provided', code: 400 }
  });

  try {
    res.locals.newExample = await ExampleModel.create({ name: req.body.name });
    return next();
  } catch (err) {
    return next({
      msg: 'An error occurred adding example',
      err: err
    });
  }
};

/**
 * Retrieves all Examples from database and stores into `res.locals.examples`
 * @type {RequestHandler}
 */
dbController.getAllExamples = async (req, res, next) => {
  try {
    res.locals.examples = await ExampleModel.find();
  } catch (err) {
    return next({
      msg: 'An error occurred retrieving examples',
      err: err
    });
  }

  return next();
};

export default dbController;