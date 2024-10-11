import { UserRoles } from "../models";

export declare interface ICreateUserRequest {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string
  image?: string;
  role?: UserRoles;
}