import express from "express"


const app = express();// creates and express app
app.use(express.json());

import userRouter from './routes/user.routes.js'

app.use('/api/v1/users', userRouter);
// ex router : https://localhost:4000/api/v1/users/register
export default app;