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

exports.updateSettings = async (req, res) => {
  data = req.body;
  db.query(
    "update `settings` set ? where set_id=1",
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
        res.status(200).json({ status:"success",message: "settings updated successfully" });
      } else res.status(401).json({ status: "failed" });
    }
  );
};
