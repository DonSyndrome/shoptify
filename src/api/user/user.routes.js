const express = require('express');
const router = express.Router();
const Auth = require('../../middleware/Auth');
// const User = require('./user.controller');
const User = {};


// add a new playlist
router.post('/', Auth.isSuperAdmin, User.CreateUser);
// get a list of playlist
router.get('/', Auth.isSuperAdmin, User.getAllUsers);
// update one playlist by the slug
router.put('/update/:id', Auth.isSuperAdmin, User.updateUser);
// delete one playlist by the slug
router.delete('/remove/:id', Auth.isSuperAdmin, User.removeUser);

module.exports = router;
