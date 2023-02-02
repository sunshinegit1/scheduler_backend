const db = require("../config/connection");

exports.getSchedules = async (req, res) => {
  db.query("select * from schedule", (err, result, fiels) => {
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
        sch_time: data.sch_time,
        sch_hours: data.sch_hours,
        est_hours: data.est_hours        
      },
    ],
    (err, result) => {
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
        sch_time: data.sch_time,
        sch_hours: data.sch_hours,
        est_hours: data.est_hours,
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
