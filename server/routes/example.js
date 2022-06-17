import { Router } from 'express';
import exampleController from '../controllers/exampleController.js';
import modelController from '../controllers/modelController.js';

const exampleRouter = Router();

exampleRouter.get('/', modelController.getAllExamples, (req, res) => {
  return res.json({ examples: res.locals.examples });
});

exampleRouter.post('/', modelController.addExample, (req, res) => {
  return res.json({ example: res.locals.newExample });
});

export default exampleRouter;