const Property = require('../models/PropertyModel');


const createProperty = async (req, res) => {
    try {
        const { name, address, description } = req.body;
        const property = new Property({
            name,
            address,
            description,
        });
        const savedProperty = await property.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllProperty = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            const error = new Error('Property not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    createProperty,
    getAllProperty,
    getPropertyById
}