import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
    res.send([
        {id:22, productName: "Kuku bar", price: 2349},
        {id:2, productName: "fufu bar", price: 299},
    ]);
});

export default router;