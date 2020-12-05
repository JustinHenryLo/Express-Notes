//1. run npm install express nodemon
//2. add a nodemon command in the scripts of package.json
//("npm start" will run the start command in scripts of package.json)
//===============================================================================
//3. import express
const express = require('express');
//===============================================================================
//4. execute express
const app = express();
//===============================================================================
//7. middleware
// will run when / is accessed
app.use('/', (req, res, next)=>{
    console.log("This is middleware");
    next();//< will continue going to the proper endpoint
})

//body parser is used to decode url data to json, install body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//cors allows api to be called in another domain
//use if backend is not same server as front end
const cors = require("cors");
app.use(cors());
//===============================================================================
//8. connect to db
const mongoose = require('mongoose');
//username: user
//password: P4$$word
//database: Cluster0

//Sample old connection string, but if this connection string is pushed to git then people can see password etc..
    mongoose.connect("mongodb+srv://user:P4$$word@cluster0.g5pbb.mongodb.net/Cluster0?retryWrites=true&w=majority",
    { useNewUrlParser: true,//< from deprecated connection warning, just used because it was suggested
    useUnifiedTopology: true },//< from deprecated connection warning, just used because it was suggested
    ()=>{console.log("connected")}); 

//Sample new connection string, uses dotenv to store DB link so no leak in pushing
    require("dotenv/config");
    mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true,//< from deprecated connection warning, just used because it was suggested
    useUnifiedTopology: true },//< from deprecated connection warning, just used because it was suggested
    ()=>{console.log("connected")}); 
//===============================================================================
//6. create api endpoints
//| app.get | app.post | app.delete | app.patch | 
app.get('/', (req,res)=>{
    res.send("HELLO WORLD");
})

//===============================================================================
//9 To make it clean, put all posts in a separate file.
//- create a routes folder
//- create a posts.js
//refer to new file
//===============================================================================
//10 Import the routes created in post.js
const postRoutes = require('./routes/posts');
app.use('/posts',postRoutes);
// /posts will be appended to all the endpoints in posts.js because of /posts param in app.use
//i.e. /posts/moreEndpoints is a sample

//===============================================================================
//5. start listening to requests
app.listen(3000);
//===============================================================================


//todo try using funcs
//todo try using utils