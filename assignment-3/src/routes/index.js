"use strict";

const express = require("express");

const router = express.Router();

router.use("/api/leadership", require("./leadership"));
router.use("/api/promotion", require("./promotion"));
router.use("/api/dishes", require("./dishes"));
router.use("/api/users", require("./user"));

module.exports = router;
