import {Request, Response} from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { LoginInputDTO, SignupInputDTO } from "../entities/User";

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

            const userBusiness = new UserBusiness();
            const token = await userBusiness.createUser(input);

            res.status(201).send({message, token});
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async login(req: Request, res: Response) {
        try {
            let message = "User logged successfully.";

            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await new UserBusiness().login(input);

            res.status(200).send({message, token});
        }
        catch(error: any) {
            let message = error.sqlMessage || error.message
            res.statusCode = 400;
            res.send({ message })
        }
    }
}