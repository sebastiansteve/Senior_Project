const path = require('path');
const express = require('express');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

const galleryController = require('../controllers/galleryControl.js');
const adminController = require('../controllers/adminControl.js');
const authController = require('../controllers/authControl');

//gallery
router.get('/', galleryController.getIndex);
router.get('/stuff-details', galleryController.getStuffDetails); 

//admin
router.get('/my-stuff', isAuth, adminController.getStuff); 
router.get('/view-stuff', adminController.getViewStuff); 
router.get('/add-stuff', isAuth, adminController.getAddStuff); 
router.post('/add-stuff', isAuth, adminController.postAddStuff);
router.get('/edit-stuff', isAuth, adminController.getEditStuff);
router.post('/edit-stuff', isAuth, adminController.postEditStuff);
router.get('/delete-stuff', isAuth, adminController.getDeleteStuff);

//auth
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);

module.exports = router;