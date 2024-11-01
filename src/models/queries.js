const connection = require('../configs/db.config.js');
const moment = require('moment-timezone');

async function getSiteData(slug, guest) {
    if (guest) {
        if (/\D/.test(guest)) {
            guest = '';
        }
    }
    let queryGuest = '';
    try {
        const checkUrl = await connection.query(`
			SELECT * FROM orders WHERE url = '${slug}'
		`);
        if (checkUrl[0][0]) {
            // URL DITEMUKAN
            let idOrder = checkUrl[0][0]['id'];
            if (guest) {
                queryGuest = `SELECT * FROM guests WHERE id = ${guest} AND idOrder = ${idOrder};`;
            }
            const dataAdditional = await connection.query(`
				SELECT * FROM profiles WHERE idOrder = ${idOrder};
				SELECT 
					id
					,idOrder
					,title
					,e.name
					,address
					,mapLink
					,e.primary
					,e.date
					,timeZone
					,icon
					,TIME_FORMAT(timeStart, "%H:%i") timeStart
					,TIME_FORMAT(timeEnd, "%H:%i") timeEnd
					,timeTillTheEnd
				FROM events e WHERE idOrder = ${idOrder};
				SELECT * FROM storys WHERE idOrder = ${idOrder};
				SELECT * FROM gallerys WHERE idOrder = ${idOrder};
				SELECT * FROM gifts WHERE idOrder = ${idOrder};
				SELECT * FROM items WHERE id = ${checkUrl[0][0]['idItem']};
				SELECT * FROM texts WHERE idOrder = ${idOrder};
				SELECT * FROM meta WHERE idOrder = ${idOrder};
				SELECT * FROM audios WHERE id = ${checkUrl[0][0]['audio']};
				SELECT * FROM cover WHERE idOrder = ${idOrder};
				${queryGuest}
			`);

            const data = {
                order: checkUrl[0][0],
                profiles: dataAdditional[0][0],
                events: dataAdditional[0][1],
                storys: dataAdditional[0][2],
                gallerys: dataAdditional[0][3],
                gifts: dataAdditional[0][4],
                template: dataAdditional[0][5][0],
                text: dataAdditional[0][6][0],
                meta: dataAdditional[0][7][0],
                audio: dataAdditional[0][8][0],
                themeCover: dataAdditional[0][9][0],
                guestInfo: dataAdditional[0][10]
            };
            return data;
        } else {
            // URL TIDAK DITEMUKAN
            return null;
        }
    } catch (error) {
        throw error;
    }
}

async function getOrderData(slug, guest) {
    if (guest) {
        if (/\D/.test(guest)) {
            guest = '';
        }
    }
    try {
        const checkUrl = await connection.query(`
			SELECT * FROM tbl_order WHERE slug = '${slug}'
		`);
        if (checkUrl[0][0]) {
            // URL ditemukan
            const orderData = checkUrl[0][0]; // Data order dari `tbl_order`
            let guestData = null;

            // Query kedua hanya dijalankan jika `guest` tersedia
            if (guest) {
                const guestQuery = await connection.query(`
                    SELECT * FROM tbl_guest WHERE id = ${guest} AND slug = '${slug}'
                `);
                guestData = guestQuery[0][0] || null; // Data guest dari `tbl_guest`
            }

            // Struktur data yang akan dikembalikan
            const data = {
                order: orderData,
                guestInfo: guestData
            };
            return data;
        } else {
            // URL tidak ditemukan
            return null;
        }
    } catch (error) {
        throw error;
    }
}

async function confirmGuest(data) {
    try {
        const query = await connection.query(`
			UPDATE tbl_guest SET confirm = '${data.confirm}', number_of_guest = '${data.numberOfGuest || 0}' WHERE id = '${data.idUser}'
		`);
        return query;
    } catch (error) {
        throw error;
    }
}

async function subscription(data) {
    try {
        const query = await connection.query(`
			INSERT INTO tbl_subscription 
			(name, email) 
			VALUES 
			('${data.name}','${data.email}')
		`);
        return query;
    } catch (error) {
        throw error;
    }
}

async function getGreetingCard(params) {
    try {
        const query = await connection.query(`
			SELECT *, DATE_FORMAT(created_at, '%e %M %Y - %k:%i:%s') AS formatted_created_at FROM tbl_gretting WHERE slug = '${params}' AND status = 1 ORDER BY id DESC
		`);
        return query[0];
    } catch (error) {
        throw error;
    }
}

async function updateViews(idGuest) {
    try {
        const query = await connection.query(`
			UPDATE tbl_guest SET view = COALESCE(view, 0) + 1 WHERE id = ${idGuest};
		`);
        return query[0];
    } catch (error) {
        throw error;
    }
}

async function saveGreetingCard(data) {
    let dateNow = moment().tz('Asia/Jakarta').format();
    try {
        const query = await connection.query(`
			INSERT INTO tbl_gretting 
			(slug, name, message, status) 
			VALUES 
			('${data.idOrder}','${data.name}','${data.message}',1)
		`);
        return query;
    } catch (error) {
        throw error;
    }
}

module.exports = { getSiteData, getOrderData, confirmGuest, getGreetingCard, saveGreetingCard, updateViews, subscription };
