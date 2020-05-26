const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var morgan = require('morgan');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.SERVER_PORT;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use(morgan('combined'));

app.get('/', (req,res)=>{
    res.send('Server running on port '+PORT)
});

app.listen(PORT, ()=>{
    console.log('Server is running on port '+PORT)
});