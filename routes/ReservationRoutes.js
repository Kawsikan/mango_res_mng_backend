const router = require('express').Router();

const { createReservation } = require('../controllers/ReservationController');
const { checkRoomAvailability } = require('../controllers/ReservationController');
const { cancelReservation } = require('../controllers/ReservationController')
const { getAllReservation } = require('../controllers/ReservationController')
const { calculateTotalAmount } = require('../controllers/ReservationController');
const { userAuth } = require('../controllers/UserController');

router.post('/', userAuth, async (req, res) => {
    await createReservation(req, res);
});

router.post('/check-availability', async (req, res) => {
    await checkRoomAvailability(req, res);
});

router.put('/cancel-reservation', async (req, res) => {
    await cancelReservation(req, res);
});

router.get('/', async (req, res) => {
    await getAllReservation(req, res);
});

router.post('/calculate-total', async (req, res) => {
    await calculateTotalAmount(req, res);
});

module.exports = router;
