//external imports
const express = require('express')
const router = express.Router()

//internal imports
const{getInbox}=require('../controller/inboxController')
const decorateHtmlResponse =require('../middleware/common/decorateHtmlResponse')

//inbox
router.route('/').get(decorateHtmlResponse("inbox"),getInbox)

module.exports=router