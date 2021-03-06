const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// mongodb + server + database

const db = mongoose.connection
// connection = connect 之後暫存的東西

//設置事件監聽器
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))
// 因為 server 只會叫起一次 所以使用 once

module.exports = db