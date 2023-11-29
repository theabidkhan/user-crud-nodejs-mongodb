const express = require('express')
const router = express.Router()
const userController = require('../controllers/user');

// Retrieve all the users
router.get('/', userController.getAllUsers);

// Create a new user
router.post('/', userController.createUser);

// Retrieve a single user with id
router.get('/:id', userController.getUserById);

// Update a user with id
router.put('/:id', userController.updateUser);

// Delete a user with id
router.delete('/:id', userController.deleteUser);

module.exports = router