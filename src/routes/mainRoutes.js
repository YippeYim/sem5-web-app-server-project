import { Router } from 'express';
import mainController from '../controllers/mainControllers.js';

const router = Router();

router.get('/', mainController.getHome);
router.get('/config/:droneId', mainController.getDroneConfig)

export default router;