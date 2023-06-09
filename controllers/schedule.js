const db = require("../config/connection");
const add = require("date-fns/add");
const notification = require('./notifications')

exports.getSchedules = async (req, res) => {
  db.query(
    "select s.*, j.job_name, j.color from schedule s, jobs j where s.job_id=j.job_id",
    (err, result, fiels) => {
      if (!err) {
        if (result.length > 0) res.status(200).send(result);
        else res.status(200).json({ message: "Schedules not found" });
      } else res.status(401).json({ status: "failed" });
    }
  );
};


exports.createSchedule = async (req, res) => {
  data = req.body;
  if(data.repeat>0){
    for (k = 0; k < data.repeat; k++) {
      count = 1;
      if (k != 0) {
        data.start_time = add(new Date(data.start_time), { days: 1 });
        data.end_time = add(new Date(data.end_time), { days: 1 });
      }
      db.query(
        "INSERT INTO `schedule` SET ? ",
        [
          {
            emp_id: data.emp_id,
            job_id: data.job_id,
            start_time: data.start_time,
            sch_hours: data.sch_hours,
            end_time: data.end_time,
          },
        ],
        async (err, result) => {
          if (!err) {
            count++;
            if (count == data.repeat) {
              notification.sendNotifications(data.job_name,data.emp_id)
              res.status(200).json({
                status: "success",
                message: "Schedules added successfully",
              });
            }
          } else res.status(401).json({ status: "failed" });
        }
      );
    }
  } else {
    db.query(
      "INSERT INTO `schedule` SET ? ",
      [
        {
          emp_id: data.emp_id,
          job_id: data.job_id,
          start_time: data.start_time,
          sch_hours: data.sch_hours,
          end_time: data.end_time        
        },
      ],
      (err, result) => {
        if(!err){
          notification.sendNotifications(data.job_name,data.emp_id)
          res.status(200).json({status:"success",message:"Schedule added successfully"})
        }else{res.status(401).json({status:"failed"})};
      })
  }
};

exports.updateSchedule = async (req, res) => {
  data = req.body;
  db.query(
    "update schedule set ? where sch_id = ? ",
    [
      {
        emp_id: data.emp_id,
        job_id: data.job_id,
        start_time: data.start_time,
        sch_hours: data.sch_hours,
        end_time: data.end_time,
        status: data.status,
        updated_date: new Date(),
      },
      req.params.id,
    ],
    (err, result) => {
      if (!err)
        res.status(200).json({
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
        status: "InActive",
        updated_date: new Date(),
      },
      req.params.id,
    ],
    (err, result) => {
      if (!err)
        res.status(200).json({
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
    "select s.*, j.*,e.* from schedule s, jobs j, employee e where s.job_id=j.job_id and s.emp_id=e.emp_id and s.emp_id = ? order by s.start_time desc",
    [req.params.id],
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
  var obj = {};
  obj["timelineDates"] = [];
  db.query(
    // "SELECT DATE(start_time) as date FROM `schedule` GROUP BY DATE(start_time)",
    `SELECT date_field as date
    FROM
    (
        SELECT
            MAKEDATE(YEAR(NOW()),1) +
            INTERVAL (MONTH(NOW())-1) MONTH +
            INTERVAL daynum DAY date_field
        FROM
        (
            SELECT t*10+u daynum
            FROM
                (SELECT 0 t UNION SELECT 1 UNION SELECT 2 UNION SELECT 3) A,
                (SELECT 0 u UNION SELECT 1 UNION SELECT 2 UNION SELECT 3
                UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7
                UNION SELECT 8 UNION SELECT 9) B
            ORDER BY daynum
        ) AA
    ) AAA
    WHERE MONTH(date_field) = MONTH(NOW());`,
    (err, result) => {
      if (result.length > 0) {
        obj["timelineDates"].push(result);
      }
      if (obj["timelineDates"] != "") {
        db.query(
          "SELECT e.emp_name,s.start_time as sch_start_time,s.end_time as sch_end_time  FROM schedule s,employee e where s.emp_id=e.emp_id order by s.start_time",
          (err, result, fiels) => {
            if (!err) {
              if (result.length > 0) {
                obj["timelines"] = [];
                obj["timelines"].push(result);
                res.status(200).send(obj);
              } else
                res
                  .status(200)
                  .json({ message: "Scheduled Timelines not found" });
            } else res.status(401).json({ status: "failed" });
          }
        );
      }
    }
  );
};
