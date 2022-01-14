const express = require("express");
const mongoose = require("mongoose");
const uriDb = require("./secret/uriDb.js")

const User = require("./model/userSchema");

const path = require('path');

const app = express();
mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(8080, () => {
    console.log('running');
})

app.use('/', (req, res, next) => {
    console.log(req.method + " : " + req.originalUrl + " - " + req.socket.remoteAddress);
    next();
})
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(express.json());

app.get('/api/readData', async (req, res, next) => {
    let users = await User.find();
    res.json(users)
});
app.post('/api/writeData', async (req, res, next) => {
    console.log(req.body.first)
    let newUser = new User({
        first: req.body.first,
        last: req.body.last,
        age: req.body.age
    })
    newUser.save(function (err, data) {
        console.log(data)
    })
    console.log(newUser)
    res.json(await User.find());
})
app.delete('/api/deleteData', async (req, res, next) => {
    console.log(req.query._id)
    await User.deleteOne({ _id: req.query._id });
    res.json(await User.find());
})
