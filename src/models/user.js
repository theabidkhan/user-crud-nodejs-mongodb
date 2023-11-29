const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    phoneNo: String,
    isActive:  { type: Boolean, default: false },
    isVerified:  { type: Boolean, default: false },
    isDeleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);