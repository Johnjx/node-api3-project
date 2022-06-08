const usersModel = require('../users/users-model')

function logger(req, res, next) {
  console.log(
    `[${req.method} to ${req.url} on ${new Date().toDateString()}]`
  );
  next();
}

function validateUserId(req, res, next) {
  usersModel.getById(req.params.id)
  .then(userObject => {
    if (userObject == null) {
      next({ status: 404, message: 'user not found'});
      return;
    }
    req.user = userObject;
    next();
  })
  .catch(next)
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId
}
