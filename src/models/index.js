import Sequelize from 'sequelize';
import HotelSchema from './hotel.model'
import ReviewSchema from './review.model'
import dbConfig from "../config/db"

const { Client } = require('pg')
const { username, password, host, dialect, database } = dbConfig;
const client = new Client({
  host,
  port: 5432,
  user: username,
  password
})

client.connect()
  .then(() => {
    client.query(`CREATE DATABASE ${database};`, (err, res) => {
      client.end()
    })

  })
  .catch(err => console.error("Connection error", err.stack))

const sequelize = new Sequelize({
  username,
  password,
  host,
  dialect,
  database,
});


const { Hotel } = HotelSchema(sequelize, Sequelize)
const { Review } = ReviewSchema(sequelize, Sequelize)

const db = {
  Sequelize,
  sequelize,
  Hotel,
  Review
};

module.exports = db;