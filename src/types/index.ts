export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  
  export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    favorite: boolean;
  }
  
  export interface AuthPayload {
    id: number;
    email: string;
  }