const express = require('express');
const { getSliderTitles } = require('../controllers/slider.js');

const router = express.Router();

router.get('/', getSliderTitles);
router.use((request, response) => response.status(404).end());

module.exports = router;