const promotionModel = require("../models/promotion.model");
const BaseService = require("../utils/BaseRepository");

class PromotionService extends BaseService {
  constructor() {
    super(promotionModel);
  }
}

module.exports = new PromotionService();
