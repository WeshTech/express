import express from "express";

const app = express();
const  PORT = process.env.PORT || 5000;


const mockUsers = [
    {id: 3, userName:"More", email: "davidwaw900@gmail.com"}, 
]


app.get('/', (req, res) => {
    res.status(201).send("Welcome to express server programming");
});


app.get('/api/users', (req, res) => {
    res.send([
        {id:1, username: "Kuria"},
        {id:2, username: "Wendo"},
        {id:3, username: "Rubia"},
    ]);
});


app.get("/api/products", (req, res) => {
    res.send([
        {id:22, productName: "Kuku bar", price: 2349},
        {id:2, productName: "fufu bar", price: 299},
    ]);
});


app.get('/api/users/:id', (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    console.log(parsedId);

    if (isNaN(parsedId)) {
        res.status(400).send({msg:"Bad request, Invalid id provided"});
    }

    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return res.status(404).send({msg: "Ooops you are not registered on the server"});
    return res.send(findUser);

})


app.listen(PORT, () => {
    console.log(`The server has started running on port:: ${PORT} `);
});