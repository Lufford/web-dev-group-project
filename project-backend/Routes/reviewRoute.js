const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../Models/Items");
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
router.get("/:id", requireAuth, async (req, res) => {
    try {
        const userInfoId = req.params.id;
        const reviews = await Review.find({ userInfo: userInfoId }).populate("item");
        return res.status(200).json(reviews);
    }
    catch {
        return res.status(500).json({ error: "Cannot find data about the user." });
    }
});

//Add review

module.exports = router;