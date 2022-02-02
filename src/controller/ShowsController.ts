import {Request, Response} from 'express';
import { ShowBusiness } from '../business/ShowBusiness';
import { BandDatabase } from '../data/BandDatabase';
import { BaseDatabase } from '../data/BaseDatabase';
import { ShowsDatabase } from '../data/ShowsDatabase';
import { Shows, ShowsInputDTO } from '../entities/Shows';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export class ShowsController {
    
    async createShow(req: Request, res: Response) {
        try {
            const weekDay = Shows.toWeekDayModel(req.body.week_day);

            const input: ShowsInputDTO = {
                weekDay,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id
            }
            const showBusiness = new ShowBusiness(
                new ShowsDatabase,
                new BandDatabase,
                new IdGenerator,
                new Authenticator
            )

            await showBusiness.createShow(input, req.headers.authorization as string)

            res.status(200).send({ message: "Show created successfully!" })
        }
        catch(error: any) {
            res.status(400).send(error.sqlMessage || error.message);
        }
        finally {
            await BaseDatabase.destroyConnection();
        }
    }
    async getShowsByWeekDay(req: Request, res: Response) {
        try {
            const weekDay = Shows.toWeekDayModel(req.query.week_day);

            const showBusiness = new ShowBusiness(
                new ShowsDatabase,
                new BandDatabase,
                new IdGenerator,
                new Authenticator
            )
                
            const shows = await showBusiness.getShowsByWeekDay(weekDay);
                
            res.status(200).send({ shows });
        }
        catch(error: any) {
            res.status(400).send(error.sqlMessage || error.message);
        }
    }
}