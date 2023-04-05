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
        color: data.color       
      },
    ],
    (err, result) => {
      if (!err) {
        res
          .status(200)
          .json({
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
            message: "Jobs is InActive Successfully",
          });
      else res.status(401).json({ status: "failed" });
    }
  );
};
