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
  let { name } = req.body;
  if (!req.body.name || typeof name !== 'string' || name.trim() === '') {
    next({ status: 400, message: "missing required name field" });
    return;
  }
  req.body = { name: name.trim() };
  next();
}

function validatePost(req, res, next) {
  let { name } = req.body;
  if (!req.body.name || typeof name !== 'string' || name.trim() === '') {
    next({ status: 400, message: "missing required name" });
    return;
  }
  req.body = {
     name: name.trim(),
     id: req.params.id 
  };
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
