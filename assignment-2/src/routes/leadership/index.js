"use strict";

const express = require("express");

const leadershipController = require("../../controllers/leadership.controller");

const asyncHandler = require("../../helpers/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(leadershipController.getAllLeadership));
router.post("/", asyncHandler(leadershipController.createLeadership));
router.get("/:leadershipId", asyncHandler(leadershipController.getLeadership));
router.delete(
  "/:leadershipId",
  asyncHandler(leadershipController.deleteLeadership)
);
router.patch(
  "/:leadershipId",
  asyncHandler(leadershipController.updateLeadership)
);
module.exports = router;
