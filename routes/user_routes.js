const express = require('express');
const userRoutes = express.Router();
const UserController = require('./../controllers/user_controller');

userRoutes.post("/create-user", UserController.createUser);
userRoutes.post("/login", UserController.login);
userRoutes.post("/getUser/all", UserController.getAllUsers);

module.exports = userRoutes;