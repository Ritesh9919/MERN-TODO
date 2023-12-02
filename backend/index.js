import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';


import connectDB from './db/mongoose.js';
import {errorHandlerMiddleware} from './middlewares/error_handler.js';

// routers
import userRouter from './routes/user.route.js';
import todoRouter from './routes/todo.route.js';



const app = express();

app.use(express.json());
app.use(cors());




app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);

app.use(errorHandlerMiddleware);


app.listen(process.env.PORT, ()=> {
    connectDB();
    console.log(`Server is running on port:${process.env.PORT}`);
})
