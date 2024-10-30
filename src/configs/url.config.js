let URL_API = 'https://padanginvitation.com/api/v1';
let URL_FE = 'https://padanginvitation.com';

// Override URLs based on environment
if (process.env.NODE_ENV !== 'production') {
    URL_API = 'http://localhost:8082/api/v1';
    URL_FE = 'http://localhost:8082';
}

module.exports = { URL_API, URL_FE };
