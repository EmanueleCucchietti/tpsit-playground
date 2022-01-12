const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        first: {type: String, required: true},
        last: {type: String, required: true},
        age: {type: Number, required: true}
    },
    {
        collection: 'users',
        versionKey: false
    },
)

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;