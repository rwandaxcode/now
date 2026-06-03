const router = require("express").Router();
const Employee = require("../models/Employee");

// CREATE
router.post("/", async (req, res) => {
  res.json(await Employee.create(req.body));
});

// READ ALL
router.get("/", async (req, res) => {
  const data = await Employee.find()
    .populate("department")
    .populate("position");

  res.json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});

// SEARCH
router.get("/search/:key", async (req, res) => {
  const result = await Employee.find({
    $or: [
      { empFirstName: { $regex: req.params.key, $options: "i" } },
      { empLastName: { $regex: req.params.key, $options: "i" } },
      { empEmail: { $regex: req.params.key, $options: "i" } }
    ]
  });

  res.json(result);
});

module.exports = router;
