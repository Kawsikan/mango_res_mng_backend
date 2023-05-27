const Reservation = require('../models/ReservationModel');
const Rate = require('../models/RateModel');
const Room = require('../models/RoomModel');


const createReservation = async (req, res) => {
    try {
        const { guestId, guestName, guestEmail, room, checkInDate, checkOutDate, boardType, occupancy, parkingNeeded, inRoomAmenities, plannedArrivalTime, specialNotes, paymentMethod, totalAmount } = req.body;

        const checkInDateUpdated = new Date(checkInDate);
        checkInDateUpdated.setHours(13, 0, 0, 0);

        const checkOutDateUpdated = new Date(checkOutDate);
        checkOutDateUpdated.setHours(11, 0, 0, 0);

        const reservation = new Reservation({
            guestId,
            guestName,
            guestEmail,
            room,
            checkInDate: checkInDateUpdated,
            checkOutDate: checkOutDateUpdated,
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

const calculateTotalAmount = async (req, res) => {

    const { checkInDate, checkOutDate, boardType, occupancy } = req.body;

    const rate = await Rate.findOne({ boardType: boardType, occupancy: occupancy });

    if (!rate) {
        return res.status(400).json({ message: 'Invalid board type or occupancy.' });
    }
    const { cost } = rate;

    try {
        const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
        const totalAmount = nights * cost;
        res.status(201).json(totalAmount);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
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

const checkRoomAvailabilityForDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        // Get all reservations within the date range
        const reservations = await Reservation.find({
            checkInDate: { $lte: endDate },
            checkOutDate: { $gte: startDate },
        });

        // Get all room IDs from the reservations
        const reservedRoomIds = reservations.map(reservation => reservation.room.toString());

        // Get all rooms
        const rooms = await Room.find();

        // Filter out the reserved rooms within the date range
        const availableRooms = rooms.filter(room => !reservedRoomIds.includes(room._id.toString()));

        res.status(200).json({ availableRooms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const cancelReservation = async (req, res) => {
    try {
        const { reservationId } = req.body;

        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservation.isCancelled) {
            return res.status(400).json({ message: 'Reservation is already cancelled' });
        }

        const currentDate = new Date();
        const checkInDate = new Date(reservation.checkInDate);
        let cancellationFee = 0;

        const differenceInMilliseconds = checkInDate.getTime() - currentDate.getTime();
        const differenceInHours = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60));


        if (differenceInHours >= 24) {
            cancellationFee = 0;
        } else if (differenceInHours >= 12) {
            cancellationFee = reservation.totalAmount * 0.2;
        } else {
            cancellationFee = reservation.totalAmount;
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

const getAllReservation = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteAllReservations = async (req, res) => {
    try {
        await Reservation.deleteMany();
        res.status(200).json({ message: 'All reservations have been deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    createReservation,
    checkRoomAvailability,
    cancelReservation,
    getAllReservation,
    calculateTotalAmount,
    checkRoomAvailabilityForDateRange,
    deleteAllReservations
}