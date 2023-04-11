const db = require("../config/connection");

exports.getJobs = async (req, res) => {
  db.query("select * from jobs", (err, result, fiels) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(200).json({ message: "Jobs not found" });
    } else res.status(401).json({ status: "failed" });
  });
};

exports.createJob = async (req, res) => {
  data = req.body;
  db.query(
    "INSERT INTO `jobs` SET ? ",
    [
      {
        job_name: data.job_name,
        job_address: data.job_address,
        job_lat: data.job_lat,
        job_lon: data.job_lon,
        color: data.color,
      },
    ],
    (err, result) => {
      if (!err) {
        res.status(200).json({
          status: "success",
          message: "Job added successfully",
        });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.updateJob = async (req, res) => {
  data = req.body;
  db.query(
    "update jobs set ? where job_id = ? ",
    [
      {
        job_name: data.job_name,
        job_address: data.job_address,
        job_lat: data.job_lat,
        job_lon: data.job_lon,
        color: data.color,
        status: data.status,
        updated_date: new Date(),
      },
      req.params.id,
    ],
    (err, result) => {
      if (!err)
        res.status(200).json({
          status: "success",
          message: "Jobs updated successfully",
        });
      else res.status(401).json({ status: "failed" });
    }
  );
};

exports.deleteJobs = async (req, res) => {
  data = req.body;
  db.query(
    "update Jobs set ? where Job_id = ? ",
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
          message: "Jobs is InActive Successfully",
        });
      else res.status(401).json({ status: "failed" });
    }
  );
};

exports.createJobByAssign = async (req, res) => {
  data = req.body;
  db.query("select assign from settings", (err, result) => {
    if (!err) {
      if (result[0].assign == 0) {
        db.query(
          "INSERT INTO `jobs` SET ? ",
          [
            {
              job_name: data.job_name,
              job_address: data.job_address,
              job_lat: data.job_lat,
              job_lon: data.job_lon,
              color: data.color,
            },
          ],
          (err1, result1) => {
            if (!err1) {
              res.status(200).json({
                status: "success",
                message: "Job added successfully",
              });
            } else res.status(401).json({ status: "failed" });
          }
        );
      } else if (result[0].assign == 1) {
        db.query(
          "INSERT INTO `jobs` SET ? ",
          [
            {
              job_name: data.job_name,
              job_address: data.job_address,
              job_lat: data.job_lat,
              job_lon: data.job_lon,
              color: data.color,
            },
          ],
          (err1, result1) => {
            if (!err1) {
              let new_job_id = result1.insertId.toString();

              db.query("select * from assignments", (err2, result2) => {
                if (!err2) {
                  result2.forEach((elem, i) => {
                    db.query(
                      "update assignments set ? where emp_id=?",
                      [
                        {
                          job_id: elem.job_id.concat("," + new_job_id),
                        },
                        elem.emp_id,
                      ],
                      (err3, result3) => {
                        if (!err3) {
                          db.query(
                            "select * from employee where emp_id not in (SELECT emp_id from assignments)",
                            (err4, result4) => {
                              if (!err4) {
                                result4.forEach((elem1, j) => {
                                  db.query(
                                    "insert into assignments set ?",
                                    [
                                      {
                                        emp_id: elem1.emp_id,
                                        job_id: new_job_id,
                                      },
                                    ],
                                    (err6, rasult6) => {
                                      if (!err6) {
                                        console.log("created success");
                                      } else
                                        res
                                          .status(401)
                                          .json({ status: "failed" });
                                    }
                                  );
                                });
                              } else res.status(401).json({ status: "failed" });
                            }
                          );
                          if (i == result2.length - 1)
                            res.status(200).json({
                              status: "success",
                              message: "Job Created successfully",
                            });
                        } else res.status(401).json({ status: "failed" });
                      }
                    );
                  });
                } else res.status(401).json({ status: "failed" });
              });
            } else res.status(401).json({ status: "failed" });
          }
        );
      }
    } else res.status(401).json({ status: "failed" });
  });
};
