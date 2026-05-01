import express from 'express';
import { CreateOrder } from '../controllers/Ordercontrollers.js';

const router = express.Router();

router.route('/order').post(CreateOrder);

export default router;