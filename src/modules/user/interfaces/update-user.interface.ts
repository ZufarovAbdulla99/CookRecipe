import { UserRoles } from "src/enum";


export declare interface IUpdateUserRequest {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
  image?: string;
  role?: UserRoles;
}
