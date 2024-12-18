const express = require('express')
const router= express.Router()
const {body} = require("express-validator")


const userController= require('../controllers/user.controllers')
const authMiddleware = require('../middlewares/auth.middleware.js')

router.post('/register',
    [
    body('email')
    .isEmail()
    .withMessage('email invalid'),

    body('password')
    .isLength({min:6})
    .withMessage('password must be at least 6 characters'),

    body('mobile')
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile number must be exactly 10 digits')
    .isNumeric()
    .withMessage('Mobile number must be numeric'),

    body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),

    body('relationshipType')
    .isIn(['self', 'son', 'daughter', 'brother', 'sister', 'relative/friend', 'client-marriage-bureau'])
    .withMessage('Invalid relationship type')
],
    userController.registerUser
)

router.post('/login',
    [
    body('email')
    .isEmail()
    .withMessage('email invalid'),
    
    body('password')
    .isLength({min:6})
    .withMessage('password must be at least 6 characters')

],
    userController.loginUser
)

router.get('/profile',authMiddleware.authUser, userController.getUserProfile)

router.get('/logout',authMiddleware.authUser, userController.logoutUser)




module.exports=router

