const express = require("express");
const router = express.Router();

const { updateSettings, getSettings } = require("../controllers/settings");

router.get("/getSettings", getSettings);
router.patch("/updateSettings", updateSettings);

module.exports = router;
