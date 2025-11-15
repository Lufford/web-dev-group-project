const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserAuth = require("../Models/UsersAuth");
const router = express.Router();
require("dotenv").config();


const signAccessToken = (UserAuthid) => {
    console.log("Signing Access Token for UserAuthId: ", UserAuthid);
    console.log("JWT", process.env.JWT_SECRET);
    console.log("JWT_EXPIRES_IN", process.env.JWT_EXPIRES_IN);
    const token = jwt.sign({ sub: UserAuthid }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    console.log("token generated", token);
    return token;
};

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "email or password is missing" });
        }
        const User = await UserAuth.findOne({ email });
        if (!User) {
            return res.status(400).json({ error: "email doesnt match our records" });
        }
        console.log("User found");
        console.log(User);
        const isPasswordMatch = await bcrypt.compare(password, User.passwordHash);
        if (isPasswordMatch) {
            // UserAuth is Authenticated
            console.log("User Authenticated");
            const token = signAccessToken(User._id);
            const vendorId = (User.userInfo._id);
            console.log("Vendor Id");
            console.log(vendorId);
            return res.json({ token, vendorId});
        } else {
            return res.status(404).json({ error: "password wrong" });
        }
    } catch (error) {
        return res.status(500).json({ exp: error });
    }
});

module.exports = router;
