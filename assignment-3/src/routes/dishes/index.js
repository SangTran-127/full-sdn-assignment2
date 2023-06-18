"use strict";

const express = require("express");

const dishesController = require("../../controllers/dishes.controller");

const {asyncHandler} = require("../../helpers/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(dishesController.getAllDishes));
router.post("/", asyncHandler(dishesController.createDish));
router.get("/:dishId", asyncHandler(dishesController.getDish));
router.delete(
  "/:dishId",
  asyncHandler(dishesController.deleteDish)
);
router.delete(
    "/:dishId/comments",
    asyncHandler(dishesController.deleteDish)
  );
router.patch(
  "/:dishId",
  asyncHandler(dishesController.updateDish)
);
module.exports = router;
