import express from 'express'
import { ShowsController } from '../controller/ShowsController';


export const showsRouter = express.Router()

const showsController = new ShowsController();

showsRouter.post('/register', showsController.createShow)
