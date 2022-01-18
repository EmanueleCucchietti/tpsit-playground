const mongoose = require("mongoose");

const ipSchema = new mongoose.Schema(
    {
        ip: {type: String, required: true},
        date: {type: Date, required: true}
    },
    {
        collection: 'closedIp',
        versionKey: false
    }
)

const model = mongoose.model("IpSchema", ipSchema)

module.exports = model