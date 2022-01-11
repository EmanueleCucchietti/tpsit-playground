const express = require("express");
const mongoose = require("mongoose");
const uriDb = require("./secret/uriDb")

const User = require("./model/userSchema");

const path = require('path');

const app = express();
mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(1337, () => {
    console.log('running');
})

app.use('/',(req,res,next)=>{
    console.log(req.method + " : " + req.originalUrl);
    next();
})
app.use('/',express.static(path.join(__dirname,'static')));
app.use(express.json());

app.get('/api/readData', async (req,res,next)=>{
    let users = await User.find();
    res.json(users)
});