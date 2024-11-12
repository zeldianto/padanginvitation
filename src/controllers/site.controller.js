const { formatFullDate, formatTime, formatDay, formatMonth, formatDate } = require('node-format-date');
const { URL_API, URL_FE } = require('../configs/url.config.js');
const { getSiteData, getOrderData } = require('../models/queries.js');
const sitemapConfig = require('../configs/sitemap.config.js');

exports.home = async (req, res) => {
    res.render('home', {
        THIS: URL_FE,
        THIS_API: URL_API
    });
};

exports.catalog = async (req, res) => {
    res.render('catalog', {
        THIS: URL_FE,
        THIS_API: URL_API
    });
};

exports.blog = async (req, res) => {
    res.render('blog', {
        THIS: URL_FE,
        THIS_API: URL_API
    });
};

exports.blogDetail = async (req, res) => {
    let slug = req.params.slug;
    res.render('blog/' + slug, {
        THIS: URL_FE,
		THIS_API: URL_API,
		SLUG: slug
    });
};


exports.sitemap = async (req, res) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapConfig.map(url => `
        <url>
          <loc>${url.loc}</loc>
          <lastmod>${url.lastmod}</lastmod>
          <changefreq>${url.changefreq}</changefreq>
          <priority>${url.priority}</priority>
        </url>
      `).join('')}
    </urlset>`;
    
    res.header('Content-Type', 'application/xml');
    res.send(xml);
};

exports.invitation = async (req, res) => {
    // this function is deprecated
};
exports.invitationV2 = async (req, res) => {
    let slug = req.params.slug;
    let guest = req.query.guest;
    try {
        const query = await getSiteData(slug, guest);
        if (query) {
            // Jika URL dan Orderan ditemukan
            let template = query.template.nameDemo;

            // Logical event
            let evPrimary = query.events.find((x) => x.primary === 1); //Cari event primary
            let evStatus = query.events[0] ? true : false;

            // Logical story
            let stStatus = query.storys[0] ? true : false;

            // Logical gallery
            let glStatus = query.gallerys[0] ? true : false;

            // Logical gallery
            let gfBank = query.gifts.filter(function (itm) {
                return itm.type === 'BANK';
            });
            let gfAddress = query.gifts.filter(function (itm) {
                return itm.type === 'ADDRESS';
            });
            let gfStatus = query.gifts[0] ? true : false;
            // Image Cover
            let imageCover = query.themeCover.urlImageCover;
            let imageHome = query.themeCover.urlImageHome;
            let imageCoverMobile = query.themeCover.urlImageCoverMobile;
            let imageHomeMobile = query.themeCover.urlImageHomeMobile;
            // Render Template
            res.render('template/' + template, {
                formatDay: formatDay,
                formatDate: formatDate,
                ID_ORDER: query.order.id,
                AUDIO_LINK: query.audio.audioUrl || 'https://cdn.dazelpro.com/uploads/dazelinv/audio/BxRKnjngjrgqYAtfdwn9Ua01I9EhpcAz.mp3',
                THIS: URL_FE,
                THIS_API: URL_API,
                DATA_PROFILES: {
                    NICKNAME1: query.profiles[0]?.nickName || '',
                    NICKNAME2: query.profiles[1]?.nickName || '',
                    NAME1: query.profiles[0]?.name || '',
                    NAME2: query.profiles[1]?.name || '',
                    PARENT1: (query.profiles[0]?.otherInformation || 'Anak dari') + ' ' + (query.profiles[0]?.parentName || ''),
                    PARENT2: (query.profiles[1]?.otherInformation || 'Anak dari') + ' ' + (query.profiles[1]?.parentName || ''),
                    IG1: query.profiles[0]?.instagramLink || '',
                    IG2: query.profiles[1]?.instagramLink || '',
                    IMAGE1: query.profiles[0]?.imageUrl || URL_FE + '/static/assets/img/bride.jpg',
                    IMAGE2: query.profiles[1]?.imageUrl || URL_FE + '/static/assets/img/bride.jpg'
                },
                DATE_EVENT_COUNT: evPrimary?.date || new Date(),
                DATE_EVENT_COVER: formatDay(evPrimary?.date || new Date()) + ', ' + formatDate(evPrimary?.date || new Date()),
                GUEST_ID: query.guestInfo ? query.guestInfo[0]?.id : '',
                GUEST_STATUS_CONFIRM: query.guestInfo ? query.guestInfo[0]?.confirm : true,
                GUEST: query.guestInfo ? query.guestInfo[0]?.name : '',
                EVENT_STATUS: evStatus,
                EVENT: query.events,
                STORY_STATUS: stStatus,
                STORY: query.storys,
                GALLERY_STATUS: glStatus,
                GALLERY: query.gallerys,
                GIFT_STATUS: gfStatus,
                GIFT_BANK: gfBank,
                GIFT_ADDRESS: gfAddress,
                TEXT: query.text,
                META: query.meta,
                IMAGECOVER: imageCover,
                IMAGECOVERMOBILE: imageCoverMobile,
                IMAGEHOME: imageHome,
                IMAGEHOMEMOBILE: imageHomeMobile
            });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.invitationV3 = async (req, res) => {
	let slug = req.params.slug;
	let guest = req.query.guest;

	try {
        const query = await getOrderData(slug, guest);
        if (query) {
            res.render('production/' + query.order.slug, {
				formatDay: formatDay,
                formatDate: formatDate,
				THIS: URL_FE,
                THIS_API: URL_API,
				SLUG: query.order.slug,
				TIMER: query.order.date,
				GUEST_ID: query.guestInfo ? query.guestInfo.id : '',
				GUEST_NAME: query.guestInfo ? query.guestInfo.name : '',
				GUEST_STATUS_CONFIRM:query.guestInfo ? query.guestInfo.confirm : '',
            });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};
