export enum UserRole {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface SignupInputDTO {
    email: string;
    name: string;
    password: string;
    role: UserRole;
}