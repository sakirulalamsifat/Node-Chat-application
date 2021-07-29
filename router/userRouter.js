//external imports
const express = require('express')
const router = express.Router()

//internal imports
const{getUsers}=require('../controller/userController')
const decorateHtmlResponse =require('../middleware/common/decorateHtmlResponse')

//login
router.route('/').get(decorateHtmlResponse("users"),getUsers)

module.exports=router