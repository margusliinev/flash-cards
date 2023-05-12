import { Request, Response } from 'express';

export const notFound = (req: Request, res: Response) => res.status(404).send('404 Page Not Found');
