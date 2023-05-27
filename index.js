const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const passport = require('passport');
const { APP_PORT, MONGODB } = require('./config');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

//inject as middleware
app.use(passport.initialize());

require('./middlewares/Validate.token')(passport);

const PORT = APP_PORT;
const MONGODB_URI = MONGODB;


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, error => {
    if (error) {
        console.log('Database connection failed' + error.message);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database connected successfully');
});

app.get("/", (req, res) => res.status(200).send("Hello World"))

app.use('/api/users', require('./routes/UserRoutes'))
app.use('/api/property', require('./routes/PropertyRoutes'))
app.use('/api/rate', require('./routes/RateRoutes'))
app.use('/api/room', require('./routes/RoomRoutes'))
app.use('/api/reservation', require('./routes/ReservationRoutes'))


module.exports = app;

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});
