const Rate = require('../models/RateModel');


const createRate = async (req, res) => {
    try {
        const { occupancy, boardType, cost } = req.body;
        const rate = new Rate({
            occupancy, boardType, cost
        });
        const savedRate = await rate.save();
        res.status(201).json(savedRate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllRates = async (req, res) => {
    try {
        const rates = await Rate.find();
        res.status(200).json(rates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createRate,
    getAllRates
}