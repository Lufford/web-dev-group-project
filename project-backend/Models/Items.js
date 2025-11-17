const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        price: {type: Number, required: true, trim: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    },
    { timestamps: true}
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;