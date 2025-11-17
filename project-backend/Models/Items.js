const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        price: {type: Number, required: true, trim: true},
        userInfo: {type: mongoose.Schema.Types.ObjectId, ref: "UserInfo"},
        vendor: {type: mongoose.Schema.Types.ObjectId, ref: "UserAuth", required: true }

    },
    { timestamps: true}
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;