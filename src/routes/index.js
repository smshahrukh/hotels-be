import express from 'express';
const router = express.Router();

import hotelRouter from './hotels';
import dashboardRouter from './dashboard';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    msg: "You got here.",
  })
});

router.use('/hotels', hotelRouter);
router.use('/dashboard', dashboardRouter);

export default router;