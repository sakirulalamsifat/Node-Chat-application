//external imports
const express = require('express')
const router = express.Router()

//internal imports
const { getUsers, addUser,removeUser } = require('../controller/userController')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')
const avatarUpload = require('../middleware/users/avatarUpload')
const {
  addUserValidators,
    addUserValidationHandler
} = require('../middleware/users/userValidator')
//login
router.route('/').get(decorateHtmlResponse('users'), getUsers)

//add user
router
  .route('/')
  .post(avatarUpload, addUserValidators, addUserValidationHandler, addUser)

// remove user
router.delete('/:id', removeUser)

module.exports = router
