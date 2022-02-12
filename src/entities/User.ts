import {Week_Day} from "./Shows";

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: UserRole
    ) {}

    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
    getEmail() {
        return this.email
    }
    getPassword(){
        return this.password
    }
    getRole(){
        return this.role
    }
    setId(id: string) {
        this.id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setEmail(email: string) {
        this.email = email;
    }
    setPassword(password: string) {
        this.password = password;
    }
    setRole(role: UserRole) {
        this.role = role;
    }

    static stringUserRole(input: string): UserRole {
        switch (input) {
            case "normal":
                return UserRole.NORMAL
            case "admin":
                return UserRole.ADMIN
            default:
                throw new Error("Invalid User Role")
        }
    }

    static toUserModel(user: any): User {
        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            User.stringUserRole(user.role)
        )
    }
}



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

export const toUserModel = (obj: any) => {
    return obj && {
        id: obj.id,
        name: obj.name,
        email: obj.email,
        password: obj.password,
        role: obj.role
    }
}