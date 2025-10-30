import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const port = 3000;
const app = express(port);


app.get('/', (req, res) => {
    console.log('someone access');
    res.send({"message":"hello"});
})
app.get('/goodbye', (req, res) => {
    console.log('someone access goodbye');
    res.send({"message":"goodbye"});
})
app.get('/:drone_id', (req, res) => {
    console.log('someone access');
    res.send({"message":req.params.drone_id});
})
app.post('/', (req, res) => {
    console.log('someone POST');
    res.json({"message":"Poss"});
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});

console.log(process.env.TTT);