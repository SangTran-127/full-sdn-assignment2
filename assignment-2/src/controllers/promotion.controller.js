const PromotionService = require("../services/promotion.service");

class PromotionController {
  getAllPromotion = async (req, res, next) => {
    res.send(await PromotionService.getAll());
  };
  getPromotion = async (req, res, next) => {
    res.send(await PromotionService.getById(req.params.promotionId));
  };
  createPromotion = async (req, res, next) => {
    res.send(await PromotionService.create(req.body));
  };
  updatePromotion = async (req, res, next) => {
    res.send(await PromotionService.update(req.params.promotionId, req.body));
  };
  deletePromotion = async (req, res, next) => {
    res.send(await PromotionService.delete(req.params.promotionId));
  };
}

module.exports = new PromotionController();
