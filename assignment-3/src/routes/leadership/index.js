"use strict";

const express = require("express");

const leadershipController = require("../../controllers/leadership.controller");

const {asyncHandler,verifyAdmin} = require("../../helpers/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(leadershipController.getAllLeadership));
router.post("/", verifyAdmin(leadershipController.createLeadership));
router.get("/:leadershipId", asyncHandler(leadershipController.getLeadership));
router.delete(
  "/:leadershipId",
  verifyAdmin(leadershipController.deleteLeadership)
);
router.patch(
  "/:leadershipId",
  verifyAdmin(leadershipController.updateLeadership)
);
module.exports = router;
