const express = require('express');
const router = express.Router();
const { check, body} = require('express-validator');
const videoController = require('../controllers/video');

router.get('/', videoController.video);

module.exports = router;