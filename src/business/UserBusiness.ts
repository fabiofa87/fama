import { UserDatabase } from "../data/UserDatabase";
import { LoginInputDTO, SignupInputDTO, User } from "../entities/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    async createUser(input: SignupInputDTO): Promise<string> {
        try {
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
            
            if(!user) {
                throw new Error('Name, email and password are required.');
            }
    
            const autheticator = new Authenticator();
            const token = autheticator.generateToken({id, role: user.role});
    
            return token;
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async login(input: LoginInputDTO): Promise<string> {
        try {
            if(!input.email || !input.password) {
                throw new Error('"Email" and "Password" are required.');
            }

            const userDatabase = new UserDatabase();
            const user = await userDatabase.getUserByEmail(input.email);

            if(!user) {
                throw new Error('User not found.');
            }

            const hashManager = new HashManager();
            const isPasswordCorrect: boolean = await hashManager.compareHash(input.password, user.password);

            if(!isPasswordCorrect) {
                throw new Error('Invalid password.');
            }

            const tokenManager = new Authenticator();
            const token = tokenManager.generateToken({id: user.id, role: user.role});

            return token;

        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}