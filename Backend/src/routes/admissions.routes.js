const express = require('express');
const router = express.Router();

const controller = require('../controllers/admissions.controller');

router.post('/apply', controller.apply);

module.exports = router;
