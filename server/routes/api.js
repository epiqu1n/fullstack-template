import { Router } from 'express';
import apiController from '../controllers/apiController.js';
import dbController from '../controllers/dbController.js';

const apiRouter = Router();

apiRouter.get('/', apiController.exampleMiddleware, function(req, res) {
  return res.json({ msg: res.locals.example });
});

apiRouter.get('/example', dbController.getAllExamples, function(req, res) {
  return res.json({ data: res.locals.examples });
});

apiRouter.post('/example', dbController.addExample, function(req, res) {
  return res.json({ success: true });
});

export default apiRouter;