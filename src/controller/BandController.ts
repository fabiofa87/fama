import {Request, Response} from 'express'
import { BandBusiness } from '../business/BandBusiness';
import { BandDatabase } from '../data/BandDatabase';
import { BandInputDTO } from '../entities/Band';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export class BandController {
    async addBand(req: Request, res: Response) {
        try{
            let message = "Band added successfully!";

            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible,
            }

            const bandBusiness = new BandBusiness(
                new BandDatabase,
                new IdGenerator,
                new Authenticator,
            );

            await bandBusiness.addBand(input, req.headers.authorization as string);

            res.status(201).send({ message });
        }
        catch(error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}