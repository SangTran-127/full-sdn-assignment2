const DishesService = require("../services/dishes.service");

class DishesController {
  getAllDishes = async (req, res, next) => {
    res.send(await DishesService.getAll());
  };
  getDish = async (req, res, next) => {
    res.send(await DishesService.getById(req.params.dishId));
  };
  createDish = async (req, res, next) => {
    res.send(await DishesService.create(req.body));
  };
  updateDish = async (req, res, next) => {
    res.send(await DishesService.update(req.params.dishId, req.body));
  };
  deleteDish = async (req, res, next) => {
    res.send(await DishesService.delete(req.params.dishId));
  };
}

module.exports = new DishesController();
