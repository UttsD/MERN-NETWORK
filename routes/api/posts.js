const express = require('express');
const router = express.Router();

// GET api/get
router.get('/', (req, res) => res.send('Post route'));

module.exports = router;
