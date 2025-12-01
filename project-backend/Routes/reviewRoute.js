const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Item = require("../Models/Items");
const Review = require("../Models/Reviews");

const requireAuth = (req, res, next) => {
    try {
        const token = req.headers.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const UserAuthid = payload.sub;
        req.UserAuthid = UserAuthid;
        return next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid Token" });
    }
}

//endpoint for authenticated vendors to see reviews
router.get("/", requireAuth, async (req, res) => {
    try {
        const userId = req.UserAuthid;
        const reviews = await Review.find({ user: userId }).populate("item");
        return res.status(200).json(reviews);
    }
    catch {
        return res.status(500).json({ error: "Cannot find data about the user." });
    }
});

//Add review

router.post("/", async (req, res) => {
    try {
        const { name, review, item } = req.body;

        if (!name || !review || !item ) {
            return res.status(400).json({
                error: "name, review and item are required."
            });
        }


        const itemCreator = await Item.findById(item);

        const itemUserId = itemCreator.user;

        const newReview = await Review.create({
            name,
            review,
            item,
            user: itemUserId  ///associating review with item creator
        });

        return res.status(201).json({
            message: "Review added successfully",
            review: newReview
        });

    } catch (error) {
        return res.status(500).json({ error: "Error adding review." });
    }
});

module.exports = router;