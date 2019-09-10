const express = require("express");
const router = express.Router();

const errors = {error:''
}

router.get(`/`, (req, res) => {
  return req.db.Article.fetchAll().then(results =>{
    let all = results.toJSON()
    if(all.length < 1){
      all.message = 'No Articles avalible'
    }
    res.render('./templates/articles/index',{all:all});
  })
});

router.get(`/new`, (req,res) =>{
  res.render('./templates/articles/new',errors)
})
router.get(`/:id/edit`,(req,res)=>{
  let article = dataBase.getArticles(req.params.id)
  if(errors.error){
    article = errors
  }else{
    article.error = ''
  }
  res.render(`./templates/articles/edit`,article)
})

router.get(`/:id`,(req,res)=>{
  let article = dataBase.getArticles(req.params.id)
  if(!article){
    article = errors
    article.error = 'Article does not exist'
  }else{
    article.error = ''
  }
  res.render('./templates/articles/articles',article)
})

router.post(`/`, (req, res) => {
  if(req.body.title === '' || req.body.author === '' || req.body.body === ''){
    errors.error = 'Please fill out all fields with the correct information Title, Author, & Body = String'
    return res.redirect('/articles/new')
  }else if(!isNaN(req.body.title) || !isNaN(req.body.author) || !isNaN(req.body.body)){
    errors.error = 'Please fill out all fields with the correct information Title, Author, & Body = String'
    return res.redirect('/articles/new')
  }
  errors.error = ''
  dataBase.addArticles(req.body.title,req.body.author,req.body.body)
  res.redirect('/articles');
}); 
router.put(`/:id`, (req,res)=> {
  if(req.body.title === '' || req.body.author === '' || req.body.body === ''){
    errors.error = 'Please fill out all fields with the correct information Title, Author, & Body = String'
    return res.redirect(`/articles/${req.params.id}/edit`)
  }else if(!isNaN(req.body.title) || !isNaN(req.body.author) || !isNaN(req.body.body)){
    errors.error = 'Please fill out all fields with the correct information Title, Author, & Body = String'
    return res.redirect(`/articles/${req.params.id}/edit`)
  }
  errors.error = ''
  dataBase.editArticles(req.params.id,req.body)
  res.redirect(`/articles/${req.params.id}`)
})
router.delete('/:id', (req,res) => {
 let article = dataBase.getArticles(req.params.id)
  if(!article){
    return res.redirect(`/articles/${req.params.id}`)
  }
  if(!isNaN(req.params.id)){
    return res.redirect(`/articles/${req.params.id}`)
  }
  errors.error = ''
  dataBase.deleteArticles(req.params)
res.redirect('/articles')
})
module.exports = router;
