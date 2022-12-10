import express from "express";
import {userRouter} from "./users/users";

const port = 8950;
const app = express();

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}/`);
})