import { User } from "../entities/User";
import {BaseDatabase} from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    async createUser(user: User) {
        try {
            await this.connection('usuarios')
            .insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role
            })
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}