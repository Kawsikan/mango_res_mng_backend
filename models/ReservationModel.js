const { Schema, model } = require('mongoose');

const ReservationSchema = new Schema({

    guestId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    guestName: {
        type: String,
        required: true
    },
    guestEmail: {
        type: String,
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    boardType: {
        type: String,
        enum: ['Bed & Breakfast', 'Half-Board', 'Full-Board']
    },
    occupancy: {
        type: String,
        enum: ['Single', 'Double', 'Triple']
    },
    parkingNeeded: {
        type: Boolean,
        default: false
    },
    inRoomAmenities: [String],
    plannedArrivalTime: {
        type: String,
        required: false
    },
    specialNotes: {
        type: String,
        required: false
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card (Online)', 'Credit Card (Onsite)', 'Cash']
    },
    totalAmount: {
        type: Number,
        required: false
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    cancelledDate: Date,
    // cancellationPolicy: {
    //     type: String,
    //     enum: ['No charge if canceled 24 hours before check-in', '20% charge if canceled within 12 hours of check-in'],
    //     required: true,
    // },
});

module.exports = model("Reservation", ReservationSchema);