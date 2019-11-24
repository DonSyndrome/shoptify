const express = require('express');
const router = express.Router();
const Auth = require('../../middleware/Auth');
// const User = require('./user.controller');
const User = {};

// get a list of users
router.get('/', Auth.isSuperAdmin, User.getAllUsers);
// update one user by the slug
router.put('/update/:id', Auth.isSuperAdmin, User.updateUser);
// delete one user by the slug
router.delete('/remove/:id', Auth.isSuperAdmin, User.removeUser);

module.exports = router;
