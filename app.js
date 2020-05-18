const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')  //預設會自動找js檔
require('./config/mongoose')

const app = express()
const port = process.env.port || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) //API設定時帶上_method就會轉換為HTTP方法

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})