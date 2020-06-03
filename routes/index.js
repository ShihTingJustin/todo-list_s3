const express = require('express')
const router = express.Router()  //使用express的路由器

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const  { authenticator } = require('../middleware/auth')

// router 條件寬鬆要放後面 避免redirect迴圈
router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router