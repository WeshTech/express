import express from "express";
import routes from './routes/index.mjs';
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const cookieParserSecret = process.env.COOKIE_PARSER_SECRET;
const sessionSecret = process.env.SESSION_SECRET;

app.use(express.json());
app.use(cookieParser(cookieParserSecret));
app.use(session({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60 * 24,
    }
}));
app.use(routes);


const  PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie('hello','world', { maxAge: 60000 * 60 * 2, signed: true });
    res.status(201).send("Welcome to express server programming");
});


app.listen(PORT, () => {
    console.log(`The server has started running on port:: ${PORT} `);
});