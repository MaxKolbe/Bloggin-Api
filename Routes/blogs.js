const express = require("express")
const router = express.Router()
const {authenticateToken} = require("../Authentication//auth")
const {rando} = require("../Authentication/auth")
const articleModel = require("../Models/articleModel")
router.use(express.urlencoded({extended: false}))


router.get("/", async (req, res)=>{
  const article = await articleModel.find().limit(20)

  res.render("blogs", {articles: article})   
})

router.get("/new", authenticateToken, (req, res) => {
  res.render("new")
})

router.get("/edit/:id", authenticateToken, async (req, res) => {
  const article = await articleModel.findById(req.params.id)
  res.render("edit", {article: article})
})
router.put("/:id", authenticateToken, async (req, res)=>{
    await articleModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      body: req.body.body,
      tags: req.body.tags,
      timestamp: new Date(),
      reading_time: rando(),
      read_count: 1,
      state: req.body.state
    })
   try{
    res.redirect(`/blogs`)
   }catch(e){
    res.render("new")
   }
})

router.post("/", authenticateToken, async (req, res)=>{
 let article = new articleModel({
  title: req.body.title,
  author: req.body.author,
  description: req.body.description,
  body: req.body.body,
  tags: req.body.tags,
  timestamp: new Date(),
  reading_time: rando(),
  read_count: 1,
  state: "Draft"
 })
 try{
  article = await article.save()
  res.redirect(`/blogs/${article.id}`)
 }catch(e){
  res.render("new")
 }
})

router.get("/:id", authenticateToken, async (req, res) => {
  const article = await articleModel.findById(req.params.id)
  if(article == null){
    res.redirect("/")
  }
  res.render("show", {article: article})
})

router.delete("/:id", authenticateToken, async (req, res)=>{
  await articleModel.findByIdAndDelete(req.params.id)
  res.redirect("/blogs")
})


module.exports = router