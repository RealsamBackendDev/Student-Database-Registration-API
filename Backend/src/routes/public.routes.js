const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'The Real Sam University public site is available',
    data: {
      institution: 'The Real Sam University',
      tagline: 'Knowledge, integrity, innovation, and leadership.',
      faculties: ['Computing', 'Management Sciences', 'Engineering', 'Arts', 'Social Sciences']
    }
  });
});

module.exports = router;
