const { URL_FE } = require('../configs/url.config.js');

exports.demoInvitation = async (req, res) => {
    let slug = req.params.slug;
    res.render('demo/' + slug, {
        THIS: URL_FE
    });
};
