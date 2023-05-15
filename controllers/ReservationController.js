const Reservation = require('../models/ReservationModel');
const Rate = require('../models/RateModel');


const createReservation = async (req, res) => {
    try {
        const { guestId, guestName, guestEmail, room, checkInDate, checkOutDate, boardType, occupancy, parkingNeeded, inRoomAmenities, plannedArrivalTime, specialNotes, paymentMethod } = req.body;

        const rate = await Rate.findOne({ boardType: boardType, occupancy: occupancy });

        if (!rate) {
            return res.status(400).json({ message: 'Invalid board type or occupancy.' });
        }

        // calculate the total amount
        const totalAmount = calculateTotalAmount(checkInDate, checkOutDate, rate.cost);

        const reservation = new Reservation({
            guestId,
            guestName,
            guestEmail,
            room,
            checkInDate,
            checkOutDate,
            boardType,
            occupancy,
            parkingNeeded,
            inRoomAmenities,
            plannedArrivalTime,
            specialNotes,
            paymentMethod,
            totalAmount,
        });

        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const calculateTotalAmount = (checkInDate, checkOutDate, cost) => {

    try {
        const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
        const totalAmount = nights * cost;
        return totalAmount;

    } catch (error) {
        console.error(error);
        throw new Error('Unable to calculate total amount');
    }
};


module.exports = {
    createReservation
}