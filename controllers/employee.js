const db = require("../config/connection");

exports.getEmployees = async (req, res) => {
  db.query("select * from employee", (err, result, fiels) => {
    console.log(err);
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(200).json({ message: "Employees not found" });
    } else res.status(401).json({ status: "failed" });
  });
};

exports.createEmployee = async (req, res) => {
  data = req.body;
  console.log("Create Employee Data", data);
  db.query(
    "INSERT INTO `employee` SET ? ",
    [
      {
        emp_name: data.emp_name,
        emp_phone: data.emp_phone,
        emp_city: data.emp_city,
        emp_email: data.emp_email,
      },
    ],
    (err, result) => {
      if (!err) {
        res.status(200).json({
          status: "success",
          message: "Employee added successfully",
        });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.updateEmployee = async (req, res) => {
  data = req.body;
  db.query(
    "update employee set ? where emp_id = ? ",
    [
      {
        emp_name: data.emp_name,
        emp_phone: data.emp_phone,
        emp_city: data.emp_city,
        emp_email: data.emp_email,
        status: data.status,
        updated_date: new Date(),
      },
      req.params.id,
    ],
    (err, result) => {
      if (!err)
        res.status(200).json({
          status: "success",
          message: "Employee updated successfully",
        });
      else res.status(401).json({ status: "failed" });
    }
  );
};

exports.deleteEmployee = async (req, res) => {
  data = req.body;
  db.query(
    "update employee set ? where emp_id = ? ",
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
          message: "Employee is InActive Successfully",
        });
      else res.status(401).json({ status: "failed" });
    }
  );
};

exports.createEmployeeBYassgn = async (req, res) => {
  data = req.body;
  db.query("select assign from settings", (err, result, fiels) => {
    if (result[0].assign == 0) {
      db.query(
        "insert into employee set ?",
        [
          {
            emp_name: data.emp_name,
            emp_phone: data.emp_phone,
            emp_city: data.emp_city,
            emp_email: data.emp_email,
          },
        ],
        (err, result) => {
          if (!err)
            res.status(200).json({
              status: "success",
              message: "Employee inserted successfully",
            });
          else res.status(401).json({ status: "failed" });
        }
      );
    } else if (result[0].assign == 1) {
      db.query(
        "insert into employee set ?",
        [
          {
            emp_name: data.emp_name,
            emp_phone: data.emp_phone,
            emp_city: data.emp_city,
            emp_email: data.emp_email,
          },
        ],
        (err, result) => {
          let emp_id = result.insertId;

          let job_id = [];
          db.query("select job_id from jobs", (err, result) => {
            result.forEach((elem) => {
              job_id.push(elem.job_id);
            });

            db.query(
              "INSERT into assignments set ?",
              [
                {
                  emp_id: emp_id,
                  job_id: job_id.toString(),
                },
              ],
              (err, result) => {
                if (!err) {
                  res.status(200).json({
                    status: "success",
                    message: "insert successfully",
                  });
                } else res.status(401).json({ status: "failed" });
              }
            );
          });
        }
      );
    }
  });
};
