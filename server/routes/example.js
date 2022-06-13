import { Router } from 'express';
import exampleController from '../controllers/exampleController.js';
import modelController from '../controllers/modelController.js';

const exampleRouter = Router();

exampleRouter.get('/', modelController.getAllExamples, function(req, res) {
  return res.json({ examples: res.locals.examples });
});

exampleRouter.post('/', modelController.addExample, function(req, res) {
  return res.json({ example: res.locals.newExample });
});

export default exampleRouter;