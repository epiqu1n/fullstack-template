import { ServerError } from '../utils/utils.js';
import { ExampleModel } from '../models/exampleModels.js';

const dbController = {};

/**
 * Adds an Example to the database
 * @type {import('express').RequestHandler}
 */
dbController.addExample = async (req, res, next) => {
  if (typeof req.body.name !== 'string') return next({
    msg: 'Invalid JSON input',
    err: { message: 'dbController.addExample: Invalid JSON input provided', code: 400 }
  });

  try {
    await ExampleModel.create({ name: req.body.name });
  } catch (err) {
    return next({
      msg: 'An error occurred adding example',
      err: err
    });
  }

  return next();
};

/**
 * Retrieves all Examples from database and stores into `res.locals.examples`
 * @type {import('express').RequestHandler}
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