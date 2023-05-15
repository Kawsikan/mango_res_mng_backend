const router = require('express').Router();

const { userLogin } = require('../controllers/UserController');
const { userRegister } = require('../controllers/UserController')


router.post('/login-user', async (req, res) => {
    await userLogin(req, res);
});


router.post('/register-user', async (req, res) => {
    await userRegister(req, res);
});


module.exports = router;