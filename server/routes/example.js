import { Router } from 'express';
import exampleController from '../controllers/exampleController.js';

const exampleRouter = Router();

exampleRouter.get('/', exampleController.exampleMiddleware, (req, res) => {
  return res.json({ msg: res.locals.example });
});

export default exampleRouter;