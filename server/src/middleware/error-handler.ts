import { Request, Response, NextFunction } from 'express';

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.status(500).json({ msg: '500 Internal Server Error' });
};
