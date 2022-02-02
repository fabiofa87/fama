import { toUserModel, User } from "../entities/User";
import {BaseDatabase} from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    async createUser(user: User) {
        try {
            await this.getConnection()
            .insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role
            })
            .into('usuarios')
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async getUserByEmail(email: string): Promise<User> {
        try {
            const result = await this.getConnection()
            .select('*')
            .where({email})
            .from('usuarios')
            
            const user = toUserModel(result[0]);

            return user;
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}