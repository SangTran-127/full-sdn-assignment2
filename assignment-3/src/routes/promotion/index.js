"use strict";

const express = require("express");

const promotionController = require("../../controllers/promotion.controller");

const {asyncHandler,verifyAdmin} = require("../../helpers/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(promotionController.getAllPromotion));
router.post("/", verifyAdmin(promotionController.createPromotion));
router.get("/:promotionId", asyncHandler(promotionController.getPromotion));
router.delete(
  "/:promotionId",
  verifyAdmin(promotionController.deletePromotion)
);
router.patch(
  "/:promotionId",
  verifyAdmin(promotionController.updatePromotion)
);
module.exports = router;
