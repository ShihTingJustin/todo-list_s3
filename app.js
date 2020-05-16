const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000
const Todo = require('./models/todo')
const routes = require('./routes')  //預設會自動找js檔

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
// mongodb + server + database

const db = mongoose.connection
// connection = connect 之後暫存的東西

//設置事件監聽器
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))
// 因為 server 只會叫起一次 所以使用 once

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) //API設定時帶上_method就會轉換為HTTP方法
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})