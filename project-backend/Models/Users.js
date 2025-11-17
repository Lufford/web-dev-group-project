const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        passwordHash: {type: String, required: true},
        name: {type: String, required: true, unique: true, trim: true},
        address: {type: String, required: true, trim: true}
    },
    {timestamps: true}
);

const User = mongoose.model('UserInfo', userSchema);

module.exports = User;