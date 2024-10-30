const { confirmGuest, getGreetingCard, saveGreetingCard, updateViews, subscription } = require('../models/queries.js');

exports.subscription = async (req, res) => {
    try {
        await subscription(req.body);
        res.status(200).json({
			data: req.body,
            success: true,
            msg: 'success subscribe'
        });
    } catch (error) {
        res.status(500).json({ code: 500, msg: error.message });
    }
};

exports.confirm = async (req, res) => {
    try {
        await confirmGuest(req.body);
        res.status(200).json({
            success: true,
            msg: 'success send confirmation'
        });
    } catch (error) {
        res.status(500).json({ code: 500, msg: error.message });
    }
};

exports.grettingCard = async (req, res) => {
    try {
        const greeting = await getGreetingCard(req.query.idOrder);
        res.status(200).json({
            success: true,
            data: {
                greeting: greeting
            }
        });
    } catch (error) {
        res.status(500).json({ code: 500, msg: error.message });
    }
};

exports.updateViews = async (req, res) => {
    try {
        const greeting = await updateViews(req.query.idGuest);
        res.status(200).json({
            success: true,
            data: {
                greeting: greeting
            }
        });
    } catch (error) {
        res.status(500).json({ code: 500, msg: error.message });
    }
};

exports.sendGrettingCard = async (req, res) => {
	console.log(req.body)
    try {
        await saveGreetingCard(req.body);
        res.status(201).json({
            success: true,
            msg: 'success creating gretting'
        });
    } catch (error) {
        res.status(500).json({ code: 500, msg: error.message });
    }
};
