const mongoose = require('mongoose')

const mongodb_URL = process.env.mongodb_URL || 'mongodb://localhost/todo-list'

mongoose.connect(mongodb_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// mongodb + server + database

const db = mongoose.connection
// connection = connect 之後暫存的東西

//設置事件監聽器
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))
// 因為 server 只會叫起一次 所以使用 once

module.exports = db