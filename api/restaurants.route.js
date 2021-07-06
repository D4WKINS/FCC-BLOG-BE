import express from "express"// Imported express package

const router = express.Router() //defined a router variable with the value of express.router()
                                //Routing refers to how an application’s endpoints (URIs) respond to client requests.

router.route("/").get((req,res) => res.send("hello world")) //using router, we have defined a callback function with the GET method as a means to aquire data from an external source in our request 
                                                          //route("/") is the default/index endpoint 

export default router // export this router to be imported to another file
