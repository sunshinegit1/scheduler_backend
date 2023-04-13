const db = require("../config/connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const dateTime = require("../middleware/currdate");

exports.loginUser = async (req, res) => {
    let data = req.body;
    user_name = data.email;
    password = data.password;
    const query = "select * from users where (name = '" + user_name + "' and password = '"
    + password  + "') or (email = '" + user_name + "' and password = '" + password + "')";
    console.log(query);
    db.query(query, (err, result) => {
      console.log(err, result);
      if (!err) {
        if (result.length === 1) {
          if (result[0].status == "inactive") {
            res.status(401).json({ message: "User is in-active, Please contact admin" });
          } else if (result[0].password == password) {
            const response = {
              user_name: result[0].user_name,
              email: result[0].email,
              role: "admin",
            };
            const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
              expiresIn: "3h",
            });
            session_user_data = {
              user_id: result[0].user_id,
              name: result[0].name,
              email: result[0].email,
              role: result[0].role,
              status: result[0].status,
            };
            res.status(200).json({ token: accessToken, user_data: session_user_data });
          } else {
            res.status(400).json({ message: "Somthing went wrong, Please try again later." });
          }
        } else {
          res.status(401).json({ message: "Incorrect Username or Password." });
        }
      } else {
        res.status(404).json({ status: "failed" });
      }
    });
  };