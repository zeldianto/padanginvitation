const express = require('express');
const { home, catalog, blog, invitationV3, sitemap } = require('../controllers/site.controller.js');
const { demoInvitation } = require('../controllers/demo.controller.js');

const siteRoutes = express.Router();

siteRoutes.get('/', home);
siteRoutes.get('/sitemap.xml', sitemap);
siteRoutes.get('/catalog', catalog);
siteRoutes.get('/blog', blog);
siteRoutes.get('/:slug', invitationV3);
siteRoutes.get('/demo/:slug', demoInvitation);

module.exports = siteRoutes;