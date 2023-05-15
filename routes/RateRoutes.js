const router = require('express').Router();

const { createRate } = require('../controllers/RateController');
const { getAllRates } = require('../controllers/RateController');


router.post('/', async (req, res) => {
    await createRate(req, res);
});

router.get('/', async (req, res) => {
    await getAllRates(req, res);
});

module.exports = router;
