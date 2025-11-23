import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';
/*import userRouter from './routers/user.routes';
import agencyRouter from './routers/agency.routes';
import clientRouter from './routers/client.routes';
import jobRouter from './routers/jobs.routes';*/

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/PIA_avgust_2023');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Database connected.')
})

const router = express.Router();
router.use('/user', userRouter);
/*router.use('/agency', agencyRouter);
router.use('/client', clientRouter);
router.use('/job', jobRouter);*/

const path = require('path');
router.use('/images', express.static(path.join('./src/images')))

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));