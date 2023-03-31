const db = require("../config/connection");

exports.getAssignmentsByEmp = async (req, res) => {
  data = req.body;
  db.query(
    "SELECT job_id FROM `assignments` WHERE emp_id=?",
    [data.emp_id],
    (err, result) => {
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status(200).json({ message: "Assignments not found" });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.updateAssignment = async (req, res) => {
  data = req.body;
  db.query(
    "UPDATE assignments set job_id=? where emp_id=?",
    [data.job_id, data.emp_id],
    (err, result) => {
      if (!err)
        res.status(200).json({
          status: "success",
          message: "Assignment updated successfully",
        });
      else res.status(401).json({ status: "failed" });
    }
  );
};
