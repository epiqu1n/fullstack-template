import { Router } from 'express';
import exampleController from '../controllers/exampleController.js';
import dbController from '../controllers/dbController.js';

const exampleRouter = Router();

exampleRouter.get('/', dbController.getAllExamples, (req, res) => {
  return res.json({ examples: res.locals.examples });
});

exampleRouter.post('/', dbController.addExample, (req, res) => {
  return res.json({ example: res.locals.newExample });
});

export default exampleRouter;