const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

//READ 瀏覽todo
router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({ userId })
    .lean()  //撈資料以後想用 res.render，要先用 .lean 來處理
    .sort({ _id: 'asc' }) // mongoose的資料排序方法，正序用asc，反序用 desc 
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
  //可能網路過程發生error，可以把error捕捉記錄下來
  // then catch 實作方法稱為 Promise  
})

module.exports = router