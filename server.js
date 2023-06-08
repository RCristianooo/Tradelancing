const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");

//Connect To Database
connectDB();

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Server Running
app.listen(process.env.PORT, () => {
    console.log("Server is running on, you better catch it!");
  });