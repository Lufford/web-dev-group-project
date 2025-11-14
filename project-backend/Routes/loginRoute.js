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

const requireAuth = (req, res, next) => {
    try{
        const token = req.headers.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const UserAuthid = payload.sub;
        req.UserAuthid = UserAuthid;
        return next();
    }
    catch(error)
    {
        return res.status(401).json({error: "Invalid Token"})
    }
}

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
      return res.json({ token });
    } else {
      return res.status(404).json({ error: "password wrong" });
    }
  } catch (error) {
    return res.status(500).json({ exp: error });
  }
});

//endpoint for vendors 
router.get("/secretEndpoint",requireAuth, async (req,res)=>{
   return res.json({"message": "this is a example for the end point that needs to be shown to authenticated User"});
});

module.exports = router;
