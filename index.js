const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { fileURLToPath } = require('url');
const { dirname } = require('path');
const dotenv = require('dotenv');
const router = require('./src/routers/index.route.js');
const connection = require('./src/configs/db.config.js');

dotenv.config();

const app = express();

const currentFilename = __filename;
const currentDirname = dirname(currentFilename);

app.use(express.json());
app.use('/static', express.static(path.join(currentDirname, 'static')));
app.use(morgan('dev'));
app.set('views', path.join(currentDirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("Sitemap: https://dazelpro.com/files/sitemap.xml\nUser-agent: *\nDisallow:");
});

app.use(router);

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT_PRODUCTION : process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server up and running in port ${PORT}`);
});
