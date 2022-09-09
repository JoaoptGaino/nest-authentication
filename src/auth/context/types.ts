import { Roles } from '@prisma/client';

export interface IPayload {
  name: string;
  sub: string;
  roles: Roles[];
}
