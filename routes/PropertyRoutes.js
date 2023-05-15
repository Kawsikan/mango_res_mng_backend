const router = require('express').Router();

const { createProperty } = require('../controllers/PropertyController');
const { getAllProperty } = require('../controllers/PropertyController');
const { getPropertyById } = require('../controllers/PropertyController');


router.post('/', async (req, res) => {
    await createProperty(req, res);
});

router.get('/', async (req, res) => {
    await getAllProperty(req, res);
});

router.get('/:id', async (req, res) => {
    await getPropertyById(req, res);
});


module.exports = router;