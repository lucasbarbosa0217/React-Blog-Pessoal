import  Theme  from './Theme';
import  User  from './User';
import { Comment } from './Comment';

export interface Blog {
    id: number;
    title: string;
    text: string;
    urlpath?: string;
    createdTimestamp: string;  
    updatedTimestamp: string;  
    theme: Theme | null;
    user: User | null;
    comment?: Comment[] | null;
}
