const { Schema, model } = require('mongoose');

const RoomSchema = new Schema({

    roomNumber: {
        type: Number,
        required: true
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    features: [{
        name: String,
        value: Schema.Types.Mixed,
    }]

});

module.exports = model("Room", RoomSchema);