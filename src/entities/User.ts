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

export interface LoginInputDTO {
    email: string;
    password: string;
}

export type  User ={
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export const toUserModel = (obj: any) => {
    return obj && {
        id: obj.id,
        name: obj.name,
        email: obj.email,
        password: obj.password,
        role: obj.role
    }
}