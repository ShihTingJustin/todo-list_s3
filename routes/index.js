const express = require('express')
const router = express.Router()  //使用express的路由器

const home = require('./modules/home')
const todos = require('./modules/todos')

router.use('/', home)
router.use('/todos', todos)

module.exports = router