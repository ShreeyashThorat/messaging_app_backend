const frinedRequestModel = require("./../models/friend_request_model");
const userModel = require('./../models/user_model');
const mongoose = require('mongoose');

const FrinedRequestController = {
    friendRequest : async function(req, res) {
        try {
            const { senderId, receiverId, requestMsg,  } = req.body;

            const newFriendRequest = new frinedRequestModel({
                senderId,
                receiverId,
                requestMsg
            });

        await newFriendRequest.save();
        await userModel.findByIdAndUpdate(senderId, { $push: { sentFriendRequests: receiverId } });

        await userModel.findByIdAndUpdate(receiverId, { $push: { receivedFriendRequests: senderId } });

          return res.json({ success: true, data: newFriendRequest, message: "Friend Request Sent Successfully!" });
        } catch (error) {
          return res.json({ success: false, message: "Server Error"});
        }
    }
}

module.exports = FrinedRequestController;