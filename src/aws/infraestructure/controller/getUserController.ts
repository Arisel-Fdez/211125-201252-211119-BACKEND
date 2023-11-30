import { Request, Response } from 'express';

export const getUserController = (req: Request, res: Response) => {
  // Aquí puedes añadir lógica adicional si necesitas procesar algo antes de responder
  res.status(200).send('OK');
};