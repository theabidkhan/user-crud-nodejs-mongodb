const User = require('../models/user.js');

// Retrieve and return all users from the database.
module.exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => {
      res.status(200).send({ code: 200, success: true, message: "Details Fetched Successfully", data: users });
    }).catch(err => {
      res.status(500).send({
        code: 500, success: false, message: err.message || "Something went wrong while fetching all users."
      });
    });
};

// Create and Save a new User
module.exports.createUser = (req, res) => {

  // Validate request body
  if (!req.body) {
    return res.status(400).send({
      code: 404, success: false, message: "Please fill all required fields"
    });
  }

  // Create a new User 
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    phoneNo: req.body.phoneNo
  });

  // Save user in the database
  user.save()
    .then(data => {
      res.status(201).send({ code: 201, success: true, message: "User Created Successfully", data: data });
    }).catch(err => {
      res.status(500).send({
        code: 500, success: false, message: err.message || "Something went wrong while creating new user."
      });
    });
};

// Find a single User with a id
exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          code: 404, success: false, message: "User not found with id " + req.params.id
        });
      }
      res.status(200).send({ code: 200, success: true, message: "Details Fetched Successfully", data: user });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          code: 404, success: false, message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        code: 500, success: false, message: "Error getting user with id " + req.params.id
      });
    });
};

// Update a User identified by the id in the request
module.exports.updateUser = (req, res) => {

  // Validate request body
  if (!req.body) {
    return res.status(400).send({
      code: 404, success: false, message: "Please fill all required fields"
    });
  }

  // Find user and update it with the request body
  User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    phoneNo: req.body.phoneNo
  }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          code: 404, success: false, message: "user not found with id " + req.params.id

        });
      }
      res.status(200).send({ code: 200, success: true, message: "Details Updated Successfully", data: user });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          code: 404, success: false, message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        code: 500, success: false, message: "Error updating user with id " + req.params.id
      });
    });
};

// Delete a User with the specified id in the request
module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          code: 404, success: false, message: "User not found with id " + req.params.id
        });
      }
      res.status(200).send({ code: 200, success: true, message: "User Deleted Successfully" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          code: 404, success: false, message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        code: 500, success: false, message: "Could not delete user with id " + req.params.id
      });
    });
};