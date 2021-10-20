import express from "express";
import db from './models/index'

import cors from "cors"
import indexRouter from "./routes/index.js"
import randomWords from 'random-words';

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors())

// db.sequelize.sync()
db.sequelize.sync({ force: true })
  .then(function () {
    const currentDate = new Date();
    const dateString = currentDate.toISOString()
    const hotels = [];
    for(let i = 0; i < 10; i++) {
      hotels.push(
        { id: i+1, name: `${randomWords()}_hotel`, created_at: dateString }
      )
    }

    db.Hotel.bulkCreate(hotels)

    const reviews = []
    for(let i = 0; i < 50; i++) {
      const hotel_id = Math.floor(Math.random() * 5) + 1;
      const score = Math.floor(Math.random() * 5) + 1;
      const comment = randomWords({ exactly: 5, join: ' ' });
      const year = Math.floor(Math.random() * 2) + 2019;
      const month = Math.floor(Math.random() * 12) + 1;
      const date = Math.floor(Math.random() * 28) + 1;
      const created_date = `${year}-${month}-${date}`
      reviews.push({
        id: i+1, hotel_id, score, comment, created_date
      })
    }

    db.Review.bulkCreate(reviews)

  })
  .then(function() {
    console.log("Seed data has been inserted in DB")
  })

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});