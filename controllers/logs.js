const db = require("../config/connection");

exports.getLogs = async (req, res) => {
  db.query(
    "SELECT g.*, j.job_name, e.emp_name FROM logs g, employee e, jobs j where g.emp_id=e.emp_id and g.job_id=j.job_id",
    (err, result, fiels) => {
      console.log(err);
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status(200).json({ message: "Logs not found" });
      } else res.status(401).json({ status: "failed" });
    }
  );
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
        job_id: data.job_id,
        device_lat: data.device_lat,
        device_lon: data.device_lon,
        cur_time: new Date(),
        status: data.status,
      },
    ],
    (err, result) => {
      if (!err) {
        res.status(200).json({
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
        job_id: data.job_id,
        device_lat: data.device_lat,
        device_lon: data.device_lon,
        cur_time: new Date(),
        status: data.status,
      },
      req.params.id,
    ],
    (err, result) => {
      if (!err)
        res.status(200).json({
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
    [req.params.id],
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
    [req.params.id],
    (err, result) => {
      console.log("Error", err);
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status(200).json({ message: "No Events" });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.getFilterLogs = async (req, res) => {
  data = req.body;
  db.query(
    "select g.*,j.job_name, e.emp_name from logs g, employee e, jobs j where g.emp_id=e.emp_id and g.job_id=j.job_id and cur_time BETWEEN ? and ? and g.job_id in (?) and g.emp_id in (?)",
    [
      data.start_date + " 00:00:00",
      data.end_date + " 23:59:59",
      [...data.job_id],
      [...data.emp_id],
    ],
    (err, result) => {
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status(200).json({ message: "Logssss not found" });
      } else {
        res.status(401).json({ status: "failed" });
      }
    }
  );
};
exports.getLoginDetails = async (req, res) => {
  db.query(
    "select j.job_name,e.emp_name,g.cur_time,g.status from employee e,jobs j,logs g where j.job_id=g.job_id and e.emp_id=g.emp_id and g.status='log_in'",
    (err, result) => {
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status(200).json({ message: "data not fouund" });
      } else res.status(401).json({ status: "failed" });
    }
  );
};
exports.getLogoutDetails = async (req, res) => {
  db.query(
    "select j.job_name,e.emp_name,g.cur_time,g.status from employee e,jobs j,logs g where j.job_id=g.job_id and e.emp_id=g.emp_id and g.status='log_out'",
    (err, result) => {
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status(200).json({ message: "data not fouund" });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.getLatestLogs = async (req, res) => {
  db.query("SELECT e.emp_id,e.emp_name,x.cur_time,x.status,x.device_lat,x.device_lon,x.sch_id,x.log_id,x.job_id,x.job_name from (SELECT em.emp_id as e_id, g.*,j.job_name from logs g,employee em,jobs j where cur_time IN (SELECT max(cur_time) from logs GROUP by emp_id) and em.emp_id=g.emp_id and g.job_id=j.job_id) x RIGHT JOIN (employee e) on e.emp_id=x.e_id",
    (err, result) => {
      if (!err) {
        if (result.length > 0) res.status(200).json(result);
        else res.status(200).json({ message: "Logs not found" });
      } else res.status(401).json({ status: "failed" });
    }
  );
};
exports.getWorkedLogs = async (req, res) => {
  db.query("SELECT e.emp_name,g.sch_id, SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT g.cur_time SEPARATOR ','), ',', 1) AS login_time,SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT g.cur_time SEPARATOR ','), ',', -1) AS logout_time FROM logs g,employee e where e.emp_id=g.emp_id GROUP BY g.sch_id",
  (err, result) => {
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status.json({ message: "logs not found" });
      } else res.status(401).json({ status: "failed" });
    }
  );
};
