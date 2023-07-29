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
            res.json({ error: error.message })
        }
    },

    login: async function(req, res) {
        try {
          const { number, password, deviceToken } = req.body;

          const foundUser = await userModel.findOne({ number: number });
          if(!foundUser) {
              return res.json({ success: false, message: "User not found!" });
          }

          const passwordsMatch = bcrypt.compareSync(password, foundUser.password);
          if(!passwordsMatch) {
              return res.json({ success: false, message: "Incorrect password!" });
          }

          foundUser.deviceToken = deviceToken;
          await foundUser.save();
          return res.json({ success: true, data: foundUser });
        }
        catch(ex) {
          return res.json({ success: false, message: ex });
        }
      }
}


module.exports = UserController;