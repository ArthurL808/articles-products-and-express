const express = require("express");
const router = express.Router();
const dataBase = require('../db/products')

const errors = {error:''
}

router.get(`/`, (req, res) => {
  let all = dataBase.getAll()
  let allProducts = {all: all}
  if(all.length < 1){
    allProducts.message = 'No products avalible'
  }
  res.render('./templates/products/index',allProducts);  
});

router.get(`/new`, (req,res) =>{
  res.render('./templates/products/new',errors)
})
router.get(`/:id/edit`,(req,res)=>{
  let product = dataBase.getProduct(req.params.id)
  if(errors.error){
    product.error = errors.error
  }else{
    product.error = ''
  }
  res.render(`./templates/products/edit`,product)
})

router.get(`/:id`,(req,res)=>{
  let product = dataBase.getProduct(req.params.id)
  if(!product){
    product = errors
    product.error = 'Product does not exisit'
  }else{
    product.error = ''
  }
  res.render('./templates/products/products',product)
})

router.post(`/`, (req, res) => {
  if(req.body.name === '' || req.body.price === '' || req.body.inventory === ''){
    errors.error = 'Please fill out all fields with the correct information Name = string , Price & Inventory = Numbers'
    return res.redirect('/products/new')
  }else if(!isNaN(req.body.name) || isNaN(req.body.price) || isNaN(req.body.inventory)){
    errors.error = "Please fill out all fields with the correct information Name = string , Price & Inventory = Numbers"
    return res.redirect('/products/new')
  }
  errors.error = ''
  dataBase.addProduct(req.body.name,req.body.price,req.body.inventory)
  res.redirect('/products');
}); 
router.put(`/:id`, (req,res)=> {
  if(req.body.name === '' || req.body.price === '' || req.body.inventory === ''){
    errors.error = "Please fill out all fields with the correct information Name = string , Price & Inventory = Numbers"
    return res.redirect(`/products/${req.params.id}/edit`)
  }else if(!isNaN(req.body.name) || isNaN(req.body.price) || isNaN(req.body.inventory)){
    errors.error = "Please fill out all fields with the correct information Name = string , Price & Inventory = Numbers"
    return res.redirect(`/products/${req.params.id}/edit`)
  }
  errors.error = ''
  dataBase.editProduct(req.params.id,req.body)
  res.redirect(`/products/${req.params.id}`)
})
router.delete('/:id', (req,res) => {
 let product = dataBase.getProduct(req.params.id)
  if(!product){
    return res.redirect(`/products/${req.params.id}`)
  }
  if(isNaN(req.params.id)){
    return res.redirect(`/products/${req.params.id}`)
  }
  errors.error = ''
  dataBase.deleteProduct(req.params)
res.redirect('/products')
})
module.exports = router;
