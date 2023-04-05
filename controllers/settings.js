const db = require("../config/connection");

exports.getSettings = async (req, res) => {
  db.query("select * from settings", (err, result) => {
    if (!err) {
      if (result.length > 0) res.status(200).json(result);
      else res.status(200).json({ message: "Settings details not found " });
    } else {
      res.status(401).json({ status: "failed" });
    }
  });
};

exports.createSettings = async (req, res) => {
  data = req.body;
  db.query(
    "INSERT INTO `settings` set ?",
    [
      {
        cname: data.cname,
        mapkey: data.mapkey,
        notifications: data.notifications,
        assign: data.assign,
      },
    ],
    (err, result) => {
      if (!err) {
        res.status(200).json({ message: "settings created successfully" });
      } else res.status(401).json({ status: "failed" });
    }
  );
};
