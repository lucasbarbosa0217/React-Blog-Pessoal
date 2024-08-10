import  User  from './User';

export default interface Role {
    id: number;
    name: string;
    users: User[];
}
