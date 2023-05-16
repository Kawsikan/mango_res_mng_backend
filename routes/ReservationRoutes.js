const router = require('express').Router();

const { createReservation } = require('../controllers/ReservationController');
const { checkRoomAvailability } = require('../controllers/ReservationController');
const { cancelReservation } = require('../controllers/ReservationController')

router.post('/', async (req, res) => {
    await createReservation(req, res);
});

router.post('/check-availability', async (req, res) => {
    await checkRoomAvailability(req, res);
});

router.post('/cancel-reservation', async (req, res) => {
    await cancelReservation(req, res);
});

// router.get('/', async (req, res) => {
//     await getAllRates(req, res);
// });

module.exports = router;
