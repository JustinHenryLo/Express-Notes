const express = require("express");
const router = express.Router();
//import post db schema from models folder
const Post = require("../models/Post");
//middleware
router.use("/", (req, res, next)=>{
    console.log("PostJS middleware");
    next();
})
//===============================================================================

//endpoints
router.get('/moreEndpoints', (req,res)=>{
    res.send("HELLO WORLD MORE ENDPOINTS");
})

//===============================================================================
//NOT async method of saving

// router.use("/", (req, res, next)=>{
//     console.log("PostJS middleware");
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     })
//     post.save()
//     .then(data => {
//         res.json(data);
//     })
//     .catch(err =>
//         res.json({message:err}))
//     next();
// })
//===============================================================================

//async version of saving
//use postman to test, send a title and description 

//add a post
router.post("/", async(req,res)=>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err){
        res.json({message:err})
    }

    //const Post;
})

//===============================================================================
//get all posts
router.get("/", async(req,res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err){
        res.json({message: err})
    }
})
//===============================================================================
//get one post given id
router.get('/:postID',async (req,res)=>{
    try{
        console.log(req.params.postID);
        var post = await Post.findById(req.params.postID);
        res.json(post);
    }
    catch(err){
       res.json({message:err})
    }
});

//===============================================================================
//delete one post given id
router.delete('/:postID',async (req,res)=>{
    try{
        console.log(req.params.postID);
        var post = await Post.remove({_id: req.params.postID});//pass a querying object
        res.json(post);
    }
    catch(err){
       res.json({message:err})
    }
});
module.exports = router;

//===============================================================================
//update a post
router.patch('/:postID',async (req,res)=>{
    try{
        console.log(req.params.postID);
        var post = await Post.updateOne(
            {_id: req.params.postID}, //pass a querying object
            {$set:{title: req.body.title}});//replace title field
        res.json(post);
    }
    catch(err){
       res.json({message:err})
    }
});
module.exports = router;

//req.params is URL params (get stuff)
//req.body is URL body (post stuff)