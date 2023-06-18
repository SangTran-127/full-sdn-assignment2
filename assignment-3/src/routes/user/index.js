"use strict";

const express = require("express");

const userController = require("../../controllers/user.controller");

const {verifyAdmin} = require("../../helpers/asyncHandler");

const router = express.Router();

router.get("/", verifyAdmin(userController.getAllUser));
module.exports = router;
