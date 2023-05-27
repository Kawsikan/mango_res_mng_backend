const router = require('express').Router();

const { createReservation, deleteAllReservations, checkRoomAvailability, checkRoomAvailabilityForDateRange, cancelReservation,
     getAllReservation, calculateTotalAmount } = require('../controllers/ReservationController');

const { userAuth } = require('../controllers/UserController');

router.post('/', userAuth, async (req, res) => {
    await createReservation(req, res);
});

router.post('/check-availability', async (req, res) => {
    await checkRoomAvailability(req, res);
});

router.post('/check-availability-range', async (req, res) => {
    await checkRoomAvailabilityForDateRange(req, res);
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

router.delete('/delete-all', async (req, res) => {
    await deleteAllReservations(req, res);
});

module.exports = router;
