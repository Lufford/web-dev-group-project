const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Item = require("../Models/Items.js"); 

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

//endpoint for vendors to see item
router.get("/:id", requireAuth, async (req, res) => {
    try {
            const vendorId = req.UserAuthid;
            const itemId = req.params.id;
            // Return the item that belongs to this vendor
            const item = await Item.findOne({
                _id: itemId,
                vendor: vendorId
            })
            .populate("userInfo")
            .populate("vendor");
            if (!item) {
                return res.status(404).json({
                    status: "error",
                    message: "Item not found or you do not have permission"
                });
            }
            return res.json({
                status: "ok",
                data: item
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Server error" });
        }
});


//POST req to add item following item schema
router.post("/", requireAuth, async (req, res) =>{
    try {
            const vendorId = req.UserAuthid;
            const { name, price, userInfoId } = req.body;
            if (!name || !price) {
                return res.status(400).json({
                    error: "Item name and price are required"
                });
            }
            const newItem = new Item({
                name,
                price,
                userInfo: userInfoId || null,
                vendor: vendorId
            });
            await newItem.save();
            return res.status(201).json({
                status: "ok",
                data: newItem
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Server error" });
        }
});

//Update items

//Delete items

module.exports = router;