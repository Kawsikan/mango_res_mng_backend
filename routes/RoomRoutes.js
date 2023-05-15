const router = require('express').Router();

const { createRoom } = require('../controllers/RoomController');
const { getAllRooms } = require('../controllers/RoomController');


router.post('/', async (req, res) => {
    await createRoom(req, res);
});

router.get('/', async (req, res) => {
    await getAllRooms(req, res);
});

module.exports = router;
