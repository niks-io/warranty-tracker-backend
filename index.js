const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var morgan = require('morgan');
const jwt = require('jsonwebtoken');
const user = require('./src/routes/userRoutes');
const job = require('./src/routes/jobRoutes');
const status = require('./src/routes/statusRoutes');
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

//JWT Setup
app.use((req, res, next)=> {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, decode) =>{
            if(err) req.user = undefined;
            req.user = decode;
            next();
        })
    }else{
        req.user = undefined;
        next();
    }
});

app.use(morgan('combined'));

// public routes
app.use('/api/v1', user);
app.use('/api/v1', job);
app.use('/api/v1', status);

app.get('/', (req,res)=>{
    res.send('Server running on port '+PORT)
});

// handle errors
app.use(function (err, req, res, next) {

    if (err.status === 404) res.status(404).json({status: "Not found"});
    else res.status(500).json({status: "Something looks wrong"});
});

app.listen(PORT, ()=>{
    console.log('Server is running on port '+PORT)
});