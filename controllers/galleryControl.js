const Art = require('../models/items');

exports.getIndex = (req, res, next) => {
    res.render('../views/pages/index', {
        title: 'Welcome',
        path: '/index', 
        itemList: null
    });
};

exports.getArtDetails = (req, res, next) => {
    res.render('../views/pages/details', {
        title: 'Details',
        path: '/details', 
        art: null
    });
};