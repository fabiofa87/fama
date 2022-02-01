import express, {Express} from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';
import { userRouter } from './endpoints/UserRouter';
import { bandRouter } from './endpoints/BandRouter';
import { showsRouter } from './endpoints/ShowsRouter';

export const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter)
app.use('/band', bandRouter);
app.use('/shows', showsRouter);

const server = app.listen(process.env.PORT || 3003, () => {
    if(server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.log('Failure upon starting server.');
    }
})

