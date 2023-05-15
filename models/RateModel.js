const { Schema, model } = require('mongoose');

const RateSchema = new Schema({

    occupancy: {
        type: String,
        required: true
    },
    boardType: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }

});

module.exports = model("Rate", RateSchema);