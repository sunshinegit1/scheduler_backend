const db = require("../config/connection");

exports.getLocations = async (req, res) => {
  db.query("select * from location", (err, result, fiels) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(200).json({ message: "Locations not found" });
    } else res.status(401).json({ status: "failed" });
  });
};

exports.createLocation = async (req, res) => {
  data = req.body;
  db.query(
    "INSERT INTO `location` SET ? ",
    [
      {
        loc_name: data.loc_name,
        loc_address: data.loc_address,
        loc_lat: data.loc_lat,
        loc_lon: data.loc_lon,        
      },
    ],
    (err, result) => {
      if (!err) {
        res
          .status(200)
          .json({
            status: "success",
            message: "Location added successfully",
          });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.updateLocation = async (req, res) => {
  data = req.body;
  db.query(
    "update location set ? where loc_id = ? ",
    [
      {
        loc_name: data.loc_name,
        loc_address: data.loc_address,
        loc_lat: data.loc_lat,
        loc_lon: data.loc_lon,
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
            message: "Location updated successfully",
          });
      else res.status(401).json({ status: "failed" });
    }
  );
};

exports.deleteLocation = async (req, res) => {
  data = req.body;
  db.query(
    "update location set ? where loc_id = ? ",
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
            message: "Location is InActive Successfully",
          });
      else res.status(401).json({ status: "failed" });
    }
  );
};
