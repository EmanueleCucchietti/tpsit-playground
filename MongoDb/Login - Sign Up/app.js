const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'wqepiojweffefweqfi"£opwqefi%w(wf$&4685r9823ywef()47)=)f89u324&%97f9)(8f34298'

mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const app = express();


// MIDDLEWARE
//  Request log
app.use("/", function (req, res, next) {
    console.log(req.method + " : " + req.originalUrl);
    next();
});

app.use('/', express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());

app.post('api/change-password', (req,res,next)=>{
    const { token } = req.body;
    const user = jwt.verify(token, JWT_SECRET);

    console.log(user)
    res.json({ status: 'ok'})
})

app.post('/api/login', async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username/password' });
    }

    if (await bcrypt.compare(password, user.password)) {

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },JWT_SECRET)

        return res.json({ status: 'ok', data: token });
    }

    return res.json({ status: 'error', error: 'Invalid username/password' });
})

app.post('/api/register', async (req, res, next) => {
    //console.log(req.body)
    const { cognome, email, nome, password: plainTextPassword, username } = req.body;

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Username Non valido' })
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Password Non valida' })
    }
    if (plainTextPassword.length < 5) {
        return res.json({ status: 'error', error: 'Password troppo corta, deve essere di almeno 6 caratteri' })
    }

    password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({
            cognome,
            email,
            nome,
            password,
            username
        })
        console.log("Utente creato con successo:" + response);
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: 'Username già in uso' })
        }
        throw error
    }


    res.json({ status: 'ok' })
})

//MIDDLEWARE



app.listen(1337, () => {
    console.log('runned');
})
