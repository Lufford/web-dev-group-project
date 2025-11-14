const express = require("express");
const bcrypt = require("bcrypt");
const UserAuth = require("../Models/UsersAuth");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "email or password or name is missing" });
    }
    const exists = await UserAuth.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 1);

    const user = await UserAuth.create({ email, name, passwordHash });
    if (user) {
      return res.status(201).json({ isReg: true });
    } else {
      return res.status(400).json({ error: "model validations failed" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
