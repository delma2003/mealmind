// backend/src/controllers/userController.ts
import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
  res.json([{ name: 'Test User', email: 'test@example.com' }]);
};
