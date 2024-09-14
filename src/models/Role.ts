import  User  from './User';

export default interface Role {
    id: string;
    name: string;
    users: User[];
}
