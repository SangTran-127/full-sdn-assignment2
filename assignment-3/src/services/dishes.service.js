const dishesModel = require("../models/dishes.model");
const BaseService = require("../utils/BaseRepository");

class DishesService extends BaseService {
  constructor() {
    super(dishesModel);
  }
}

module.exports = new DishesService();
