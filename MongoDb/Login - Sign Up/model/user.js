const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        nome: { type: String, required: true, unique: true },
        cognome: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        collection: 'users'
    }
)

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;