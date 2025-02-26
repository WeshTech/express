import express from "express";
import routes from './routes/index.mjs'

const app = express();

app.use(express.json());
app.use(routes)


const  PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.status(201).send("Welcome to express server programming");
});


app.listen(PORT, () => {
    console.log(`The server has started running on port:: ${PORT} `);
});