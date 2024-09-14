import { Blog } from './Blog';

export default interface Theme {
    id: string;
    description?: string;
    blog?: Blog[] | null;
}
