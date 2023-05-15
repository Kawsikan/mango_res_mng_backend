const router = require('express').Router();

const { createReservation } = require('../controllers/ReservationController');


router.post('/', async (req, res) => {
    await createReservation(req, res);
});

// router.get('/', async (req, res) => {
//     await getAllRates(req, res);
// });

module.exports = router;
