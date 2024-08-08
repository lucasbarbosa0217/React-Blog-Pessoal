import { Theme } from './Theme';
import { User } from './User';
import { Comment } from './Comment';

export interface Blog {
    id: number;
    title: string;
    text: string;
    urlpath?: string;
    createdTimestamp: string;  // ISO 8601 string format
    updatedTimestamp: string;  // ISO 8601 string format
    theme: Theme;
    user: User;
    comment: Comment[];
}
