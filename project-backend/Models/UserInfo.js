const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true, trim: true},
        address: {type: String, required: true, trim: true}
    }
);

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;