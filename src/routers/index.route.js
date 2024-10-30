const express = require('express');
const siteRoutes = require('./site.route.js');
const apiRoutes = require('./api.route.js');

const router = express.Router();

router.use('/', siteRoutes);
router.use('/api/v1', apiRoutes);

module.exports = router;