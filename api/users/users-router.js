const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const usersModel = require('./users-model');
//const postsModel = require('../posts/posts-model');

// The middleware functions also need to be required
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  usersModel.get()
  .then(arr => {
    res.json(arr);
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  usersModel.insert(req.body)
  .then(newUser => res.status(201).json(newUser))
  .catch(next)
});

router.put('/:id', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  usersModel.update(req.params.id, req.body)
  .then(updatedUser => res.json(updatedUser))
  .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  usersModel.remove(req.params.id)
  .then(deleteCount => {
    return deleteCount ? res.json(req.user) : next({
      status: 503, message: 'Service Unavailable'
    });
  })
  .catch(next);
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  usersModel.getUserPosts(req.params.id)
  .then(postsArr => res.json(postsArr))
  .catch(next);
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

module.exports = router;
