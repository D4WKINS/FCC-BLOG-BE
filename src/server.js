import express from 'express'
import cors from "cors"
import restaurants from "../api/restaurants.route.js"
// import PORT from '.env'
const server = express()

const port = process.env.PORT || 8000
server.use(cors()) // To use cors middleware
server.use(express.json())//Our server can now accept JSON in the body of the request
         //We define a new path to restaurants using a new path and the import that is now where the new path takes us
server.use("/api/stupid/restaurants",restaurants) // server.use() allows us to use a specific route or package in our current file, server.use(path,import)
server.use("*", (req, res) => res.status(404).json({error: "not found"}))// asterisk represents a wildcard if a user tries to enter a route that isn't in our route file and to return a json with an error if so

server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
export default server