const http = require('http');
const index = require('./app')
require('dotenv').config()
const server = http.createServer(index);
const PORT = process.env.PORT || 4500
server.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`)
})