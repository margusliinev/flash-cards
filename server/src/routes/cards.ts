import express from 'express';
const router = express.Router();
import { getAllCards, createCard, deleteCard } from '../controllers/cards';

router.route('/').get(getAllCards).post(createCard);
router.route('/:id').delete(deleteCard);

export default router;
