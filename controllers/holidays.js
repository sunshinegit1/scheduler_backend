const db = require("../config/connection");

exports.getHolidays = async (req, res) => {
  db.query("select * from holidays", (err, result, fields) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(200).json({ message: "data not found" });
    } else res.status(401).json({ status: "failed" });
  });
};
exports.createHoliday = async (req, res) => {
    data = req.body;
    db.query(
      "INSERT INTO `holidays` SET ? ",
      [
        {
          name: data.name,
          start_date: data.start_date,
          end_date: data.end_date,
               
        },
      ],
      (err, result) => {
        if (!err) {
          res
            .status(200)
            .json({
              status: "success",
              message: "Holiday added successfully",
            });
        } else res.status(401).json({ status: "failed" });
      }
    );
  };
