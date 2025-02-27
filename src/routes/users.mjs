import { Router } from "express";
import { query, validationResult } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { User } from '../mongoose/schemas/user';

const router = Router();

router.get('/api/users', 
    query('name').isString().notEmpty().isLength({min: 3, max: 8}).withMessage("min of 3 max of 8"), (req, res) => {
        const result = validationResult(req);
        console.log(result);
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


router.put('/api/users/:id', (req, res) => {
    const { body, params: {id} } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)
    if (findUserIndex === -1) { res.status(404).send({msg: "Who the fuck are you looking for?"}); }

    mockUsers[findUserIndex] = { id: parsedId, ...body };
    return res.status(200).send(mockUsers[parsedId - 1]);
});


router.delete("/api/users/:id", (req, res) => {
    const { params: { id } } = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.status(400).send("Bad request");
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if ( findUserIndex === -1 ) return res.status(404).send({msg: "User not found!"});
    mockUsers.splice(findUserIndex, 1);
    return res.sendStatus(200);
});


router.patch("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) res.status(400).send("Bad request");
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return res.status(404).send({msg: "User not found!"});
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
    return res.status(200).send({msg: "Data patched"});
});


router.post('/api/users', (req, res) => {
    const { body } = req.body;
    console.log(body);
});


export default router;