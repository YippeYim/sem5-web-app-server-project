import { Router } from 'express';
import mainController from '../controllers/mainControllers.js';

const router = Router();

router.get('/', mainController.getHome);

export default router;