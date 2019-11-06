const express = require('express');
const router = express.Router();
const Auth = require('../../middleware/Auth');
const UploadImage = require('./uploadImage');

// add a new playlist
router.post('/image', Auth.isAuthenticated, UploadImage);


module.exports = router;
