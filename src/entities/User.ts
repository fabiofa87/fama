export enum UserRole {
    NORMAL = "normal",
    ADMIN = "admin"
}

export interface SignupInputDTO {
    email: string;
    name: string;
    password: string;
    role: UserRole;
}

export type  User ={
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}