const LeadershipService = require("../services/leadership.service");

class LeadershipController {
  getAllLeadership = async (req, res, next) => {
    res.send(await LeadershipService.getAll());
  };
  getLeadership = async (req, res, next) => {
    res.send(await LeadershipService.getById(req.params.leadershipId));
  };
  createLeadership = async (req, res, next) => {
    res.send(await LeadershipService.create(req.body));
  };
  updateLeadership = async (req, res, next) => {
    res.send(await LeadershipService.update(req.params.leadershipId, req.body));
  };
  deleteLeadership = async (req, res, next) => {
    res.send(await LeadershipService.delete(req.params.leadershipId));
  };
}

module.exports = new LeadershipController();
