import express from 'express'
import PORT from '.env'
const server = express()

const port = PORT
server.listen(port,() =>{
    console.log(`Server is running on port ${port}`)
})