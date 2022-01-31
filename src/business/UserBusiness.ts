import { UserDatabase } from "../data/UserDatabase";
import { SignupInputDTO, User } from "../entities/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    async createUser(input: SignupInputDTO): Promise<string> {
        
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.createHash(input.password);

        const user: User = {
            id: id,
            name: input.name,
            email: input.email,
            password: hashPassword,
            role: input.role
        }

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(user)        

        const autheticator = new Authenticator();
        const token = autheticator.generateToken({id, role: user.role});

        return token;
    }
}