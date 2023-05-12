import { Request, Response } from 'express';
import { query } from '../db';

export const getAllCards = async (req: Request, res: Response) => {
    const cards = await query('select * from cards');
    if (!cards) {
        throw new Error('500 Internal Server Error');
    }
    res.status(200).json({ cards });
};

export const createCard = async (req: Request, res: Response) => {
    const card = await query('insert into cards (title) values ($1) returning *', [req.body.title]);
    if (!card) {
        throw new Error('500 Internal Server Error');
    }
    res.status(201).json({ card });
};
