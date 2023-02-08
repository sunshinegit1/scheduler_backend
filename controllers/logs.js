const db = require("../config/connection");

exports.getLogs = async (req, res) => {
  db.query("select * from logs", (err, result, fiels) => {
    console.log(err);
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(200).json({ message: "Logs not found" });
    } else res.status(401).json({ status: "failed" });
  });
};

exports.createLogs = async (req, res) => {
  data = req.body;
  console.log("Create log Data", data);
  db.query(
    "INSERT INTO `logs` SET ? ",
    [
      {
        sch_id: data.sch_id,
        emp_id: data.emp_id,
        device_lat: data.device_lat,
        device_lon: data.device_lon,
        cur_time: new Date(),
        status: data.status
      },
    ],
    (err, result) => {
      if (!err) {
        res
          .status(200)
          .json({
            status: "success",
            message: "Log added successfully",
          });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.updateLogs = async (req, res) => {
  data = req.body;
  db.query(
    "update logs set ? where log_id = ? ",
    [
      {
        sch_id: data.sch_id,
        emp_id: data.emp_id,
        device_lat: data.device_lat,
        device_lon: data.device_lon,
        cur_time: new Date(),
        status: data.status
      },
      req.params.id,
    ],
    (err, result) => {
      if (!err)
        res
          .status(200)
          .json({
            status: "success",
            message: "Logs updated successfully",
          });
      else res.status(401).json({ status: "failed" });
    }
  );
};



exports.getLogsByEmpId = async (req, res) => {
  data = req.body;
  db.query(
    "SELECT * FROM `logs` WHERE emp_id=? order BY log_id DESC limit 1",
    [
      req.params.id
    ],
    (err, result) => {
      console.log("Error", err);
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status(200).json({ message: "Employee logs not found " });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.getLogsBySchId = async (req, res) => {
  data = req.body;
  db.query(
    "SELECT * FROM `logs` WHERE sch_id=?",
    [
      req.params.id
    ],
    (err, result) => {
      console.log("Error", err);
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status(200).json({ message: "No Events" });
      } else res.status(401).json({ status: "failed" });
    }
  );
};
