import {Request, Response} from 'express';
import { SignupInputDTO } from "../entities/User";

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
            const token = await userBusiness.signup(input);

            res.status(201).send({message, token});
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}