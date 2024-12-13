import { Request } from 'express';

export class AuthRequest extends Request {
  public user: {
    id: number;
    username: string;
  };
}
