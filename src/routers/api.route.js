const express = require('express');
const { confirm, grettingCard, sendGrettingCard, updateViews, subscription } = require('../controllers/api.controller.js');

const apiRoutes = express.Router();

apiRoutes.get('/gretting-card', grettingCard);
apiRoutes.get('/update-views', updateViews);
apiRoutes.post('/gretting-card', sendGrettingCard);
apiRoutes.post('/confirm', confirm);

apiRoutes.post('/subscription', subscription);

module.exports = apiRoutes;