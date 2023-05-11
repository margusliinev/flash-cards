import express from 'express';
const router = express.Router();
import { getAllCards, createCard } from '../controllers/cards';

router.route('/').get(getAllCards).post(createCard);

export default router;
