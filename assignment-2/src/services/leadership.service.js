const leadershipModel = require("../models/leadership.model");
const BaseService = require("../utils/BaseRepository");

class LeadershipService extends BaseService {
  constructor() {
    super(leadershipModel);
  }
}

module.exports = new LeadershipService();
