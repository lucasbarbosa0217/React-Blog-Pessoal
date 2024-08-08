import { User } from './User';

export interface Role {
    id: number;
    name: string;
    users: User[];
}
