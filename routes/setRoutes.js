const express = require("express");
const router = express.Router();

const { createSettings, getSettings } = require("../controllers/settings");

router.get("/getSettings", getSettings);
router.post("/createSettings", createSettings);

module.exports = router;
