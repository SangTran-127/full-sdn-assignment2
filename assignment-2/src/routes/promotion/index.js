"use strict";

const express = require("express");

const promotionController = require("../../controllers/promotion.controller");

const asyncHandler = require("../../helpers/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(promotionController.getAllPromotion));
router.post("/", asyncHandler(promotionController.createPromotion));
router.get("/:promotionId", asyncHandler(promotionController.getPromotion));
router.delete(
  "/:promotionId",
  asyncHandler(promotionController.deletePromotion)
);
router.patch(
  "/:promotionId",
  asyncHandler(promotionController.updatePromotion)
);
module.exports = router;
