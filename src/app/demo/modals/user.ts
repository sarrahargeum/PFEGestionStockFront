import { Magasin } from "./magasin";
import { Roles } from "./roles";

  export class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Roles;
    magasin:Magasin
  }
