const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      password: hash,
      employee: req.body.employeeId
    });

    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
      .populate("employee");

    if (!user) return res.status(404).json("User not found");

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) return res.status(400).json("Invalid password");

    req.session.user = {
      id: user._id,
      employee: user.employee
    };

    res.json(req.session.user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json("Logged out");
});

module.exports = router;
