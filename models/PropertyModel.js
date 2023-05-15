const { Schema, model } = require('mongoose');

const PropertySchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = model("Property", PropertySchema);
