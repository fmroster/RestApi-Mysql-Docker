const express =  require('express')
const bodyParser = require('body-parser')
const app = express()

const postsRoute  = require('./routes/posts')
const usersRoute  = require('./routes/users')
const imageRoute  = require('./routes/image')
const testRoutes  = require('./routes/tests')
const addressRoutes = require('./routes/address')
app.use(bodyParser.json())

app.use('/image', express.static('uploads')) //fix this

app.use('/posts', postsRoute)
app.use('/users', usersRoute)
app.use('/images', imageRoute)
app.use('/tests', testRoutes);
app.use('/address', addressRoutes)
// test route
app.use('/test', (req, res)=>{
    res.send('app working fine')
})
module.exports = app