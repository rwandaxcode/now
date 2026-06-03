const router = require("express").Router();
const Employee = require("../models/Employee");

// ON LEAVE REPORT GROUPED BY DEPARTMENT
router.get("/leave", async (req, res) => {
  const employees = await Employee.find({ status: "on leave" })
    .populate("department");

  const report = {};

  employees.forEach(emp => {
    const dept = emp.department.departmentName;

    if (!report[dept]) {
      report[dept] = {
        total: 0,
        employees: []
      };
    }

    report[dept].employees.push({
      name: emp.empFirstName + " " + emp.empLastName,
      email: emp.empEmail,
      date: emp.employmentDate
    });

    report[dept].total++;
  });

  res.json(report);
});

module.exports = router;
