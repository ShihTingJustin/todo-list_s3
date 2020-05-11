const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')

const app = express()
const port = 3000

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

app.get('/', (req, res) => {
  //拿到全部的 Todo 資料
  Todo.find()
    .lean()  //撈資料以後想用 res.render，要先用 .lean 來處理
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
    //可能網路過程發生error，可以把error捕捉記錄下來
    // then catch 實作方法稱為 Promise  
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})