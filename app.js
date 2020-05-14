const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')

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

app.use(bodyParser.urlencoded({ extended: true }))

//READ 瀏覽todo
app.get('/', (req, res) => {
  //拿到全部的 Todo 資料
  Todo.find()
    .lean()  //撈資料以後想用 res.render，要先用 .lean 來處理
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
  //可能網路過程發生error，可以把error捕捉記錄下來
  // then catch 實作方法稱為 Promise  
})

//CREATE 新增todo
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  // 在 server建立 DB mongoose.model 的實例 然後存檔
  // 若有其他需求也可以使用這個實例
  // const todo = new Todo({ name })
  // return todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))

  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//READ 查看單一todo
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//UPDATE 更改todo
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      // if (isDone === 'on') {
      //   todo.isDone = true
      // } else {
      //   todo.isDone = false
      // }      
      return todo.save()
      // save 是 mongoose 提供的方法
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

//DELETE 刪除todo
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id) //先確定 todo 存在
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})