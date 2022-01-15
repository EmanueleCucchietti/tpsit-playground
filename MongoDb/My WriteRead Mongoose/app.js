const express = require("express");
const mongoose = require("mongoose");
const uriDb = require("./secret/uriDb.js")

const User = require("./model/userSchema");
const IpSchema = require("./model/ipSchema")

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
    let ipClient = req.socket.remoteAddress;
    IpSchema.findOne({ip: ipClient}, function(err, result) {
        if (err) {
            console.log(err)
            res.send(err);
        } else {
            if(result == null){
                //writable
                let newUser = new User({
                    first: req.body.first,
                    last: req.body.last,
                    age: req.body.age
                })
                newUser.save(function (err, data) {
                    console.log(data)
                })
                res.json(await User.find());
            }
            else{
                //already wrote
            }
        }
      });
    console.log(new Date())
    /*
    console.log(req.body.first)
    
    console.log(newUser)
})
app.delete('/api/deleteData', async (req, res, next) => {
    console.log(req.query._id)
    await User.deleteOne({ _id: req.query._id });
    res.json(await User.find());
})
