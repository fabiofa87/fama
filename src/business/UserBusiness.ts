import { UserDatabase } from "../data/UserDatabase";
import {LoginInputDTO, SignupInputDTO, toUserModel, User} from "../entities/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) {
    }


    async createUser(input: SignupInputDTO): Promise<string> {
        try {
            if(!input.email || !input.name || !input.password || !input.role) {
                throw new Error("Invalid input")
            }

            if(input.email.indexOf("@") === -1) {
                throw new Error("Invalid email")
            }

            if(input.password.length < 6) {
                throw new Error("Password must have 6+ digits and one special character")
            }

            const userId = this.idGenerator.generate()
            const hashPassword =  this.hashManager.createHash(input.password)

            await this.userDatabase.createUser(
                User.toUserModel({
                    ...input,
                    id: userId,
                    password: hashPassword
                })
            )
    
            const accessToken = this.authenticator.generateToken({id: userId, role: input.role})
    
            return accessToken;
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
            const isPasswordCorrect: boolean = await hashManager.compareHash(input.password, user.getPassword());

            if(!isPasswordCorrect) {
                throw new Error('Invalid password.');
            }

            const tokenManager = new Authenticator();
            const token = tokenManager.generateToken({id: user.getId(), role: user.getRole()});

            return token;

        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}