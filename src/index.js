import server from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import server from "./server.js"
import RestaurantsDAO from "./../api/dao/restaurantDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        poolSize:50, // how many users are permitted at the same time
        wtimeout:2500, 
        useNewUrlParse:true
    }
)
.catch(err=>{
    console.error(err.stack)
    process.exit(1)
})
.then(async client =>{
 // After we have establish a connection to our database
 // But before we started the server
 // we are going to call a injectDB
 //This is how we get a reference to our restaurants collection in the database
    await RestaurantsDAO.injectDB(client) 

    server.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
    })
})