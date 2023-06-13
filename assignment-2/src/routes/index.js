"use strict";

const express = require("express");

const router = express.Router();

router.use("/api/leadership", require("./leadership"));
router.use("/api/promotion", require("./promotion"));

module.exports = router;
