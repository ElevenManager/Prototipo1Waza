const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.put('/users/:id', userController.editUser);
router.get('/users/:id', userController.getUser);
router.get('/users', userController.getAllUsers);
router.put('/users/:id/deactivate', userController.deactivateUser);
router.put('/users/:id/activate', userController.activateUser);
router.post('/login', userController.verifyUser);
router.post('/logout', userController.logoutUser);

module.exports = router;
