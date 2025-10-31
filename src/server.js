import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/mainRoutes.js';
dotenv.config();


const port = 3000;
const app = express(port);

app.use('/', routes)

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});