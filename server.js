const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const exphbs = require('express-handlebars')
const productsRoutes = require('./routes/products')

const PORT = 8080;

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main.hbs'
}))
app.set('views',__dirname + '/views')
app.set('view engine', '.hbs')

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req,res) => {

res.send('no index made yet')
})

app.use('/products', productsRoutes)

app.listen(PORT, console.log(`server is listening on PORT ${PORT}`))
// app.use(express.static('db'))