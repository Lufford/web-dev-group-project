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
router.get("/", requireAuth, async (req, res) => {
    try {
            const vendorId = req.UserAuthid;
            // Return the item that belongs to this vendor
            const item = await Item.findOne({
                user: vendorId
            });
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
            const user = req.UserAuthid;
            const { name, price} = req.body;
            if (!name || !price) {
                return res.status(400).json({
                    error: "Item name and price are required"
                });
            }
            const newItem = new Item({
                name,
                price,
                user
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
router.put("/:id", requireAuth, async (req, res) =>{
    try{
        const item = req.params.id;
        if(!item){
            return res.status(401).json({error: "Cannot find item"});
        }
        const updatedItem = req.body;
        const newItem = await Item.findByIdAndUpdate(item, updatedItem, {new: true} );
        return res.status(201).json({status: "Updated", newItem});
    }
    catch(error){
        return res.status(500).json({error: "Could not update item"});
    }
});

//Delete items

router.delete("/:id", requireAuth, async (req, res) =>{
    try {
        const item = req.params.id;
        if(!item){
            return res.status(401).json({error: "Cannot find item"});
        }
        await Item.findByIdAndDelete(item);
        return res.status(200).json({status: "Deleted"});
    } 
    catch (error) {
        return res.status(500).json({error: "Server error"});
    }
});


//public route for customers to view items
router.get("/public", async (req, res) => {
    try {
        const items = await Item.find({});
        return  res.json({
            status: "ok",
            data: items
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
});
module.exports = router;