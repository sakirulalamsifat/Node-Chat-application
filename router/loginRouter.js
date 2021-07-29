//external imports
const express = require('express')
const router = express.Router()

//internal imports
const{getLogin}=require('../controller/loginController')
const decorateHtmlResponse =require('../middleware/common/decorateHtmlResponse')

//login
router.route('/').get(decorateHtmlResponse("login"),getLogin)

module.exports=router