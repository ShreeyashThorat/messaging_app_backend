const express = require('express');
const userRoutes = express.Router();
const UserController = require('./../controllers/user_controller');
const FrinedRequestController = require('./../controllers/friend_request_controller');

userRoutes.post("/create-user", UserController.createUser);
userRoutes.post("/login", UserController.login);
userRoutes.post("/getUser/all", UserController.getAllUsers);

// friend requests
userRoutes.post("sendRequest", FrinedRequestController.friendRequest);

module.exports = userRoutes;