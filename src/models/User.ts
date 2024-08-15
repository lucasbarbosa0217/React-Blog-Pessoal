import { Blog } from './Blog';
import { Comment } from './Comment';
import  Role  from './Role';

export default interface User {
    id: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    blog?: Blog[];
    comment?: Comment[];
    roles?: Role[];
}
