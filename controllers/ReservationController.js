const Reservation = require('../models/ReservationModel');
const Rate = require('../models/RateModel');
const Room = require('../models/RoomModel');


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


const checkRoomAvailability = async (req, res) => {
    try {
        const { date } = req.body;

        // Get all reservations for the specified date
        const reservations = await Reservation.find({
            checkInDate: { $lte: date },
            checkOutDate: { $gte: date },
        });

        // Get all room IDs from the reservations
        const reservedRoomIds = reservations.map(reservation => reservation.room.toString());

        // Get all rooms
        const rooms = await Room.find();

        // Filter out the reserved rooms for the specified date
        const availableRooms = rooms.filter(room => !reservedRoomIds.includes(room._id.toString()));

        res.status(200).json({ availableRooms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const cancelReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;

        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservation.isCancelled) {
            return res.status(400).json({ message: 'Reservation is already cancelled' });
        }

        // const currentDate = new Date();
        // const plannedArrivalTime = new Date(reservation.plannedArrivalTime);
        // const checkInDate = new Date(reservation.checkInDate);

        // // Calculate the time difference between the current date and planned arrival time
        // const timeDifference = plannedArrivalTime - currentDate;
        // const hoursDifference = Math.ceil(timeDifference / (1000 * 60 * 60));


        const currentDate = new Date();
        const checkInDate = new Date(reservation.checkInDate);
        let cancellationFee = 0;
        
        if((currentDate.getDate - checkInDate)>1){
            cancellationFee = 0;
        }

        const timeDifference = 1300 - currentDate.getTime();
        const hoursDifference = Math.ceil(timeDifference / (1000 * 60 * 60));


        // Check if the cancellation is within 12 hours prior to check-in
        if (hoursDifference <= 12) {
            cancellationFee = reservation.totalAmount * 0.2; // 20% cancellation fee
        }


        reservation.isCancelled = true;
        reservation.cancelledDate = currentDate;

        await reservation.save();

        return res.status(200).json({ message: 'Reservation cancelled successfully', cancellationFee });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    createReservation,
    checkRoomAvailability,
    cancelReservation
}