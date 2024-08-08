import { Blog } from './Blog';

export interface Theme {
    id: number;
    description: string;
    blog: Blog[];
}
