import express from "express";
import routes from './routes/index.mjs';
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import { mockUsers } from "./utils/constants.mjs";
import passport from "passport-local";
import './strategy/local-strategy.mjs';

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
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.post('/api/auth', passport.authenticate('local'), (req, res) => {

})


const  PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie('hello','world', { maxAge: 60000 * 60 * 2, signed: true });
    res.status(201).send("Welcome to express server programming");
});


app.post('/api/auth', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body
    const findUser = mockUsers.find((user) => user.username === username);

    if (!findUser) return res.status(404).send("User not found");

    if (findUser.password !== password) return res.status(401).send("Invalid credentials");

    req.session.user = findUser;
    return res.status(200).send(findUser);
});


app.listen(PORT, () => {
    console.log(`The server has started running on port:: ${PORT} `);
});