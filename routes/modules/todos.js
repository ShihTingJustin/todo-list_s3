const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

//CREATE 新增todo
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('', (req, res) => {
  const { name } = req.body
  const userId = req.user._id

  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

  // 在 server建立 DB mongoose.model 的實例 然後存檔
  // 若有其他需求也可以使用這個實例
  // const todo = new Todo({ name })
  // return todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))

  // 用逗點隔開一次新增多個todo 但單獨打逗點會錯誤 還需要調整
  // const todos = String(req.body.name).split(',').map(todo => ({ name: todo }))
  // return Todo.insertMany(todos)
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
})

//READ 查看單一todo
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Todo.findOne({ _id, userId })
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//UPDATE 更改todo
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  return Todo.findOne({ _id, userId })
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const { name, isDone } = req.body
  const userId = req.user._id

  return Todo.findOne({ _id, userId })
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
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

//DELETE 刪除todo
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  return Todo.findOne({ _id, userId }) //先確定 todo 存在
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router