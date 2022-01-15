const express = require("express");
const mongoose = require("mongoose");
const uriDb = require("./secret/uriDb.js")

const User = require("./model/userSchema");
const IpSchema = require("./model/ipSchema")

const path = require('path');
const { Console, time } = require("console");
const { write } = require("fs");

//Program Consts
const timeAvailableForEachWrite = 10000;

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
    IpSchema.findOne({ ip: ipClient }, async function (err, result) {
        if (err) {
            console.log(err)
            res.send(err);
        } else {
            console.log("If(result==undefined -> firstRequest : nRequest")
            console.log("result: ");
            console.log(result)
            console.log("endResult")
            if (result == null) {
                //writable,
                writeUser(req.body.first, req.body.last, req.body.age);
                writeIp(ipClient);
            }
            else {
                let oldDate = result.date;
                let actualDate = new Date();
                let timePassed = actualDate.getTime() - oldDate.getTime();
                if (timePassed > timeAvailableForEachWrite) {
                    writeUser(req.body.first, req.body.last, req.body.age, ipClient);
                    console.log(updateIp(ipClient));
                    res.json("read")
                }
                else
                    res.json("wait10000")
                console.log(timePassed)
                console.log("ipSet")

            }
        }
    });
    /*
    console.log(req.body.first)
    
    console.log(newUser)*/
})
app.delete('/api/deleteData', async (req, res, next) => {
    console.log(req.query._id)
    await User.deleteOne({ _id: req.query._id });
    res.json(await User.find());
})

function writeUser(ifirst, ilast, iage) {
    console.log("ENTRO")
    let newUser = new User({
        first: ifirst,
        last: ilast,
        age: iage
    })
    console.log(newUser)
    newUser.save(function (err, data) {
        console.log(data)
        console.log(err)
    })
}
function writeIp(ipClient) {
    let newIpRecord = new IpSchema({
        ip: ipClient,
        date: (new Date())
    })
    newIpRecord.save(function (err, data) {
        console.log(data)
    })
}
function updateIp(ipClient) {
    IpSchema.findOneAndUpdate({ ip: ipClient }, { date: new Date() }, function (err, doc) {
        if (err) return err
        return 'Succesfully saved.'
    });
}
async function findAllUsers() {
    let users = await User.find();
    console.log(users)
    return users;
}