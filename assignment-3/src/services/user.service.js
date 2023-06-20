const userModel = require("../models/user.model");
const BaseService = require("../utils/BaseRepository");

class UserService extends BaseService {
  constructor() {
    super(userModel);
  }
}

module.exports = new UserService();
