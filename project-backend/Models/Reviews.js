const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        review: {type: String, require: true, trim: true},
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", require: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true}
    },
    { timestamps: true}
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;