import express from 'express';
const router = express.Router();

import db from "../models/index"

const fetchHotels = async (req, res, next) => {
    try {
        const hotels = await db.Hotel.findAll();
        res.status(200).json({
            hotels
        })
    }
    catch(e) {
        console.log(e);
        res.status(400).json({
            "msg": JSON.stringify(e)
        })
    }
}

router.get('/', fetchHotels)


export default router;