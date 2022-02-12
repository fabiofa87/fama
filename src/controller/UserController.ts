import {Request, Response} from 'express';
import { UserBusiness } from '../business/UserBusiness';
import {LoginInputDTO, SignupInputDTO, User} from "../entities/User";
import {BaseDatabase} from "../data/BaseDatabase";
import {Authenticator} from "../services/Authenticator";
import {HashManager} from "../services/HashManager";
import {IdGenerator} from "../services/IdGenerator";
import {UserDatabase} from "../data/UserDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {
            let message = "User created successfully.";

            const input: SignupInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

            const userBusiness = new UserBusiness(
                new UserDatabase(),
                new IdGenerator(),
                new HashManager(),
                new Authenticator()
            )
            const token = await userBusiness.createUser(input)

            res.status(201).send({message, token});
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
        await BaseDatabase.destroyConnection()
    }
    async login(req: Request, res: Response) {
        try {
            let message = "User logged successfully.";

            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const userBusiness = new UserBusiness(
                new UserDatabase(),
                new IdGenerator(),
                new HashManager(),
                new Authenticator()
            )
            const token = await userBusiness.login(input)

            res.status(200).send({message, token});
        }
        catch(error: any) {
            let message = error.sqlMessage || error.message
            res.statusCode = 400;
            res.send({ message })
        }
        await BaseDatabase.destroyConnection()
    }
}