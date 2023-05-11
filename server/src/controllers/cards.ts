import { Request, Response } from 'express';
import { query } from '../db';

export const getAllCards = async (req: Request, res: Response) => {
    try {
        const cards = await query('select * from cards');
        res.status(200).json({ cards });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

export const createCard = async (req: Request, res: Response) => {
    try {
        const card = await query('insert into cards (title) values ($1) returning *', [req.body.title]);
        res.status(201).json({ card });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};
