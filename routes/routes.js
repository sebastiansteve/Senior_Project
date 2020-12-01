const path = require('path');

const express = require('express');

const router = express.Router();

const galleryController = require('../controllers/galleryControl.js');
const adminController = require('../controllers/adminControl.js');
const authController = require('../controllers/authControl');

//gallery
router.get('/', galleryController.getIndex);
router.get('/art-details', galleryController.getArtDetails);

//admin
router.get('/add-art', adminController.getAddArt);
router.post('/add-art', adminController.postAddArt);
router.get('/edit-art', adminController.getEditArt);
router.post('/edit-art', adminController.postEditArt);

//auth
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);

module.exports = router;