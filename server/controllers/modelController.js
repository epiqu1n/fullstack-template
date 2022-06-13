import { query, queryOne, sql } from '../models/exampleModel.js'; 
const modelController = {};

/**
 * Retrieves all Examples from database and stores into `res.locals.examples`
 * @type {import("express").RequestHandler}
 */
modelController.getAllExamples = async function (req, res, next) {
  const getQuery = sql`
    SELECT * FROM Examples
  `;

  try {
    res.locals.examples = (await query(getQuery)).rows;
    return next();
  } catch (err) {
    return next({
      msg: 'An error occurred retrieving examples',
      err: err
    });
  }
};

/**
 * Adds an Example to the database and stores it into `res.locals.newExample`
 * @type {import("express").RequestHandler}
 */
modelController.addExample = async function (req, res, next) {
  if (typeof req.body.name !== 'string') return next({
    msg: 'Invalid JSON parameters',
    err: 'modelController.addExample: Invalid JSON input provided'
  });

  const getQuery = sql`
    INSERT INTO Examples ("name")
    VALUES ($1)
    RETURNING "name"
  `;
  const params = [req.body.name];

  try {
    res.locals.newExample = await queryOne(getQuery, params);
    return next();
  } catch (err) {
    return next({
      msg: 'An error occurred retrieving examples',
      err: err
    });
  }
};

export default modelController;