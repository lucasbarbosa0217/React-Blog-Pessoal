import  Theme  from './Theme';
import  User  from './User';
import { Comment } from './Comment';

export interface Blog {
    id: string;
    title?: string;
    text?: string;
    urlPath?: string;
    createdTimestamp?: string;  
    updatedTimestamp?: string;  
    theme?: Theme | null;
    user?: User | null;
}
