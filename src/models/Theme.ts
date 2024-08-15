import { Blog } from './Blog';

export default interface Theme {
    id: number;
    description: string;
    blog?: Blog[] | null;
}
