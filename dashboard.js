import express from 'express';
const router = express.Router();
import moment from "moment"
import { Op }  from "sequelize";
import db from "../models/index"

const fetchReviewsOvertime = async (req, res, next) => {
    const { query, params } = req;
    const { hotelId } = params;
    const today = moment()
    const startDate = query.startDate ? moment(query.startDate) : today; 
    const endDate = query.endDate ? moment(query.endDate) : today;

    const daysDiff = endDate.diff(startDate, 'days')

    try {
        const averagescore = await db.sequelize.query(
            `SELECT hotel_id, score,  created_date AS label, AVG(score)::numeric(10,2) AS averageScore, Count(score) AS reviewCount FROM "reviews" AS "review"
                 WHERE "review"."hotel_id" = ${hotelId} AND "review"."created_date" >= '${query.startDate}' AND "review"."created_date" <= '${query.endDate}' 
                 GROUP BY hotel_id, score, created_date ORDER BY hotel_id ASC;`
            , { raw: true })

        // const data = [
        //     { label: "2019-02-10", reviewCount: 12, averageScore: 1.2 },
        //   ]
        const datapoints = averagescore[0]
        let groupedDate = "";
        if (daysDiff > 0 && daysDiff < 30) {
            groupedDate = "Grouped daily"
        } else if (daysDiff > 29 && daysDiff < 90) {
            groupedDate = "Grouped weekly"
        } else {
            groupedDate = "Grouped monthly"
        }
        res.status(200).json({
            data: {
                datapoints,
                groupedDate
            }
        })
    }
    catch(e) {
        console.error(e)
        res.status(404).json({
            error: "No data found"
        })
    }



}

router.get('/:hotelId', fetchReviewsOvertime)


export default router;