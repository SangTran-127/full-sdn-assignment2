const UserService = require("../services/user.service");

class UserController {
  getAllUser = async (req, res, next) => {
    res.send(await UserService.getAll());
  };
//   getUser = async (req, res, next) => {
//     res.send(await UserService.getById(req.params.leadershipId));
//   };
//   createLeadership = async (req, res, next) => {
//     res.send(await UserService.create(req.body));
//   };
//   updateLeadership = async (req, res, next) => {
//     res.send(await UserService.update(req.params.leadershipId, req.body));
//   };
//   deleteLeadership = async (req, res, next) => {
//     res.send(await UserService.delete(req.params.leadershipId));
//   };
}

module.exports = new UserController();
