const userService = require("../services/user.service");

const asyncHandler = (callback) => {
  return (req, res, next) => {
    callback(req, res, next).catch(next);
  };
};

const verifyAdmin = (callback) => {
  return async (req, res, next) => {
    req.user = await userService.getById(req.headers.userid)
    if (req.user.isAdmin) {
      callback(req, res, next).catch(next);
    } else {
      res.status(403).send('You do not have Admin privileges');
    }
  };
};

module.exports = {asyncHandler,verifyAdmin};
