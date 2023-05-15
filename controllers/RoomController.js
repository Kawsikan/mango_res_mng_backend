const Room = require('../models/RoomModel');


const createRoom = async (req, res) => {
    try {
        const { roomNumber, property, features } = req.body;
        const room = new Room({
            roomNumber, property, features
        });
        const savedRoom = await room.save();
        res.status(201).json(savedRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('property');
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createRoom,
    getAllRooms
}