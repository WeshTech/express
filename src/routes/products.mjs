import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies);
    if (req.signedCookies.hello && req.signedCookies.hello === "world") {
        return res.send([
            {id:22, productName: "Kuku bar", price: 2349},
            {id:2, productName: "fufu bar", price: 299},
        ]);
    }
    return res.status(403).send({ msg: "Sorry you need the correct cookie!!!" });
    
});

export default router;