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
    const card = await query('insert into cards (title, answer) values ($1, $2) returning *', [req.body.title, req.body.answer]);
    if (!card) {
        throw new Error('500 Internal Server Error');
    }
    res.status(201).json({ card });
};

export const deleteCard = async (req: Request, res: Response) => {
    const card = await query('delete from cards where id = $1', [req.params.id]);
    if (!card) {
        throw new Error('500 Internal Server Error');
    }
    res.status(204).json({ card });
};
