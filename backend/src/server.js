const express = require("express");
const app = express()
const cors = require("cors")
const path = require('path')

let winston = require('winston')

// const logger = require('./startup/logging')

require("dotenv").config();

app.use(cors({ origin: "*"}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/images", express.static(path.join(__dirname, "images")))

const PORT = process.env.PORT || 5000

app.use("/", (req, res) => {
    return res.send("Hello")
})

require('./startup/jwtenv')();
require('./startup/mongodb')();


const server = app.listen(PORT, () => {
    winston.info(`listening on PORT ${PORT}`)
})

module.exports = server