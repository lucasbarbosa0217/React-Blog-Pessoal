import { Blog } from './Blog';
import User  from './User';

export interface Comment {
    id: string;
    text: string;
    blog: Blog;
    user?: User;
    updatedTimestamp?: string;  // ISO 8601 string format
}
