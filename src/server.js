import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // <<< 1. นำเข้า CORS Middleware
import routes from './routes/mainRoutes.js';
dotenv.config();


const port = 3000;
const app = express();
app.use(cors());

app.use(express.json());

app.use('/', routes)

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});
