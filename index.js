require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require("socket.io");
const http = require("http");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listening requests
        console.log("Connected to db")
    })
    .catch((error)=>{
        console.log(error);
    });

    // routes
const userRoutes = require('./routes/user_routes');
app.use("/api/user", userRoutes);

const server = http.createServer(app);
const io = socketIo(server);

    // listen for request
// app.listen(process.env.PORT, () => console.log("Listening on port 4000"));
server.listen(process.env.PORT, () => console.log("Listening on port 4000"));

module.exports = {app}