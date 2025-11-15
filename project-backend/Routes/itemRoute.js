const express = require("express");
const router = express.Router();

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
    //return items corresponding to id
});


//POST req to add item following item schema
router.post("/", requireAuth, async (req, res) =>{

});

//Update items

//Delete items

module.exports = router;