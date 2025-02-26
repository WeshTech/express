import express from "express";
import routes from './routes/index.mjs';
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(cookieParser("BOHh0aOeyCin1zmAulw3Lf8J1ZIJ6pLxOcNxA6Ax45k="));
app.use(routes);


const  PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.cookie('hello','world', { maxAge: 60000 * 60 * 2, signed: true });
    res.status(201).send("Welcome to express server programming");
});


app.listen(PORT, () => {
    console.log(`The server has started running on port:: ${PORT} `);
});