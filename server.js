const express = require('express')
const bodyParser = require('body-parser')
const methodOveride = require('method-override')
const app = express()
const exphbs = require('express-handlebars')
const productsRoutes = require('./routes/products')
const articlesRoutes = require('./routes/articles')

const PORT = 8080;

app.use(methodOveride('_method'))

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main.hbs'
}))
app.set('views',__dirname + '/views')
app.set('view engine', '.hbs')
// app.set('styles',__filename + 'styles')
app.use(bodyParser.urlencoded({extended: false}))
// app.use(express.static(__filename + 'stlyes'))

app.get('/', (req,res) => {

res.send('no index made yet')
})
app.use('/articles',articlesRoutes)
app.use('/products', productsRoutes)

app.listen(PORT, console.log(`server is listening on PORT ${PORT}`))