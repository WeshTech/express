import express from "express";

const app = express();

app.use(express.json());

const  PORT = process.env.PORT || 5000;


const mockUsers = [
    { id: 1, username: "Alice", email: "alice@example.com" },
    { id: 2, username: "Bob", email: "bob@example.com" },
    { id: 3, username: "Charlie", email: "charlie@example.com" },
    { id: 4, username: "David", email: "david@example.com" },
    { id: 5, username: "Eve", email: "eve@example.com" },
    { id: 6, username: "Frank", email: "frank@example.com" },
    { id: 7, username: "Grace", email: "grace@example.com" },
    { id: 8, username: "Hannah", email: "hannah@example.com" },
    { id: 9, username: "Isaac", email: "isaac@example.com" },
    { id: 10, username: "Jack", email: "jack@example.com" },
    { id: 11, username: "Karen", email: "karen@example.com" },
    { id: 12, username: "Liam", email: "liam@example.com" },
    { id: 13, username: "Mia", email: "mia@example.com" },
    { id: 14, username: "Noah", email: "noah@example.com" },
    { id: 15, username: "Olivia", email: "olivia@example.com" },
    { id: 16, username: "Paul", email: "paul@example.com" },
    { id: 17, username: "Quinn", email: "quinn@example.com" },
    { id: 18, username: "Ryan", email: "ryan@example.com" },
    { id: 19, username: "Sophia", email: "sophia@example.com" },
    { id: 20, username: "Thomas", email: "thomas@example.com" }
]


app.get('/', (req, res) => {
    res.status(201).send("Welcome to express server programming");
});


app.get('/api/users', (req, res) => {
    console.log(req.query);

    const { 
        query: {name, value},
    } = req;
    //when filter and value are undefined
    if (!name || !value) return res.send(mockUsers);

    if (name && value) return res.send(
        mockUsers.filter((user) => user[name].includes(value))
    )

    res.send(mockUsers);
});


app.get("/api/products", (req, res) => {
    res.send([
        {id:22, productName: "Kuku bar", price: 2349},
        {id:2, productName: "fufu bar", price: 299},
    ]);
});


app.post('/api/users', (req, res) => {
    console.log(req.body);
    const { body } = req;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
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
});


app.put('/api/users/:id', (req, res) => {
    const { body, params: {id} } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)
    if (findUserIndex === -1) { res.status(404).send({msg: "Who the fuck are you looking for?"}); }

    mockUsers[findUserIndex] = { id: parsedId, ...body };
    return res.status(200).send(mockUsers[parsedId - 1]);
});


app.listen(PORT, () => {
    console.log(`The server has started running on port:: ${PORT} `);
});