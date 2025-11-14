const express = require("express");
const router = express.Router();
const Review = require("../Models/Reviews");

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
        return res.status(401).json({error: "Invalid Token"});
    }
}

//endpoint for vendors to see review
router.get("/reviews/:id",requireAuth, async (req,res)=>{ 
    const vendorName = req.params.id;
    const reviews = await Review.findOne({name: vendorName});
    return res.json({"message": "this is a example for the end point that needs to be shown to authenticated User"});
});
