import Role  from "./Role";

export default interface UserLogin {
  id: number;
  name: string;
  email: string;
  password: string;
  photo?: string;
  token: string;
  role?: Role[];
}
