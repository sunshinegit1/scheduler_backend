const db = require("../config/connection");

exports.getSchedules = async (req, res) => {
  db.query("select s.*, l.loc_name, l.color from schedule s, location l where s.loc_id=l.loc_id", (err, result, fiels) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(200).json({ message: "Schedules not found" });
    } else res.status(401).json({ status: "failed" });
  });
};

exports.createSchedule = async (req, res) => {
  data = req.body;
  db.query(
    "INSERT INTO `schedule` SET ? ",
    [
      {
        emp_id: data.emp_id,
        loc_id: data.loc_id,
        start_time: data.start_time,
        sch_hours: data.sch_hours,
        end_time: data.end_time        
      },
    ],
    (err, result) => {
      console.log("==Create==", err);
      if (!err) {
        res
          .status(200)
          .json({
            status: "success",
            message: "Schedule added successfully",
          });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.updateSchedule = async (req, res) => {
  data = req.body;
  db.query(
    "update schedule set ? where sch_id = ? ",
    [
      {
        emp_id: data.emp_id,
        loc_id: data.loc_id,
        start_time: data.start_time,
        sch_hours: data.sch_hours,
        end_time: data.end_time,
        status: data.status,
        updated_date: new Date()
      },
      req.params.id,
    ],
    (err, result) => {
      if (!err)
        res
          .status(200)
          .json({
            status: "success",
            message: "schedule updated successfully",
          });
      else res.status(401).json({ status: "failed" });
    }
  );
};

exports.deleteschedule = async (req, res) => {
  data = req.body;
  db.query(
    "update schedule set ? where sch_id = ? ",
    [
      {       
        status: 'InActive',
        updated_date: new Date()
      },
      req.params.id,
    ],
    (err, result) => {
      if (!err)
        res
          .status(200)
          .json({
            status: "success",
            message: "schedule is InActive Successfully",
          });
      else res.status(401).json({ status: "failed" });
    }
  );
};

exports.getSchedulesByEmpId = async (req, res) => {
  data = req.body;
  db.query(
    "select s.*, l.*,e.* from schedule s, location l, employee e where s.loc_id=l.loc_id and s.emp_id=e.emp_id and s.emp_id = ?",
    [
      req.params.id
    ],
    (err, result) => {
      console.log("Error", err);
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status(200).json({ message: "Employee schedules not found " });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.getTimelines = async (req, res) => {
  db.query("SELECT DATE(s.start_time) as sch_date,e.emp_name,s.start_time as sch_start_time,s.end_time as sch_end_time  FROM schedule s,employee e where s.emp_id=e.emp_id;", (err, result, fiels) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(200).json({ message: "Scheduled Timelines not found" });
    } else res.status(401).json({ status: "failed" });
  });
};
