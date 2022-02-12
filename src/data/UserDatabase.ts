import { toUserModel, User } from "../entities/User";
import {BaseDatabase} from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    async createUser(user: User) {
        try {
            await this.getConnection()
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
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