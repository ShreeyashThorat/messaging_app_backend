const userModel = require('./../models/user_model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserController = {
     createUser: async function(req, res) {
      const userData = req.body;
        //add doc to db
        try {
          const newUser = new userModel(userData);
          await newUser.save();
          return res.json({ success: true, data: newUser, message: "User Created Successfully!" });
        } catch (error) {
          return res.json({ success: false, message: "Server Error"});
        }
    },

    login: async function(req, res) {
        try {
          const { number, password, deviceToken } = req.body;

          const foundUser = await userModel.findOne({ number: number });
          if(!foundUser) {
              return res.json({ success: false, message: "User not found!" });
          }

          const passwordsMatch = bcrypt.compare(password, foundUser.password);
          if(!passwordsMatch) {
              return res.json({ success: false, message: "Incorrect password!" });
          }

          foundUser.deviceToken = deviceToken;
          await foundUser.save();
          return res.json({ success: true, data: foundUser });
        }
        catch(ex) {
          return res.json({ success: false, message: "Server Error"});
        }
      },

      getAllUsers: async function(req, res){
        try{
          const currentUserId = req.body.currentUserId; // Change the field name to match what you send from Flutter
          // Fetch the current user from the database
          const currentUser = await userModel.findById(currentUserId);
          // Fetch all users from the database (excluding the password field)
          const allUsers = await userModel.find({}, '-password');
          // Get an array of user IDs to exclude from the response
          const blockedUsersIds = currentUser.blockedUsers;
          const blockedByUsersIds = currentUser.blockedByUserd;
          const sentFriendRequestsIds = currentUser.sentFriendRequests;
          // Filter out users based on blocked users, blocked by users, and users with sent friend requests
          const filteredUsers = allUsers.filter((user) => {
            return (
              user.id !== currentUserId &&
              !blockedUsersIds.includes(user.id) &&
              !blockedByUsersIds.includes(user.id) &&
              !sentFriendRequestsIds.includes(user.id)
              );
            });

          return res.json({ success: true, data: filteredUsers, message: "Successfully! get users" });
        }catch(ex) {
          return res.json({ success: false, message: ex });
        }
      }
}


module.exports = UserController;