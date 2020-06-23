const express = require("express")
const linksRouter = express.Router()
const {createLink, createLinkTags, createTag} = require("./../db/index.js")
linksRouter.get("/", async function(req, res, next){


}) 

linksRouter.post("/", async function(req, res, next){
const {comment, URL, tags} = req.body
if (URL === undefined) {
  res.send({message: "URL is required"})  
} 
const link = await createLink({comment, URL})
const parsedTags = await JSON.parse(tags)
const createdTagArray = parsedTags.map(async element => {
 const response = await createTag({element})   
 return response
});
console.log(createdTagArray)
})


module.exports = linksRoutergit add .JSON