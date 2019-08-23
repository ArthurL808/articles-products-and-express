const express = require("express");
const router = express.Router();
const dataBase = require('../db/products')

router.get(`/`, (req, res) => {
  let all = dataBase.getAll()
  let allProducts = {all: all}
  if(all.length < 1){
    allProducts.message = 'No products avalible'
  }
  res.status(200)
  res.render('./templates/products/index',allProducts);  
});

router.get(`/new`, (req,res) =>{
  res.render('./templates/products/new')
})
router.get(`/:id/edit`,(req,res)=>{
  let product = dataBase.getProduct(req.params.id)
  res.render(`./templates/products/edit`,product)
})

router.get(`/:id`,(req,res)=>{
  let product = dataBase.getProduct(req.params.id)
  res.render('./templates/products/products',product)
})

router.post(`/`, (req, res) => {
  if(req.body.name === '' || req.body.price === '' || req.body.inventory === ''){
    return res.render('./templates/products/new',{message:'Please fill out all fields'})
  }else if(!isNaN(req.body.name) || isNaN(req.body.price) || isNaN(req.body.inventory)){
    return res.render('./templates/products/new',{message:'Please fill out all fields with the correct information Name = string , Price & Inventory = Numbers'})
  }
  dataBase.addProduct(req.body.name,req.body.price,req.body.inventory)
  res.redirect('/products');
}); 
router.put(`/:id`, (req,res)=> {
  let getProduct = dataBase.getProduct(req.params.id)
  if(req.body.name === '' || req.body.price === '' || req.body.inventory === ''){
    getProduct.message = 'Please fill out all fields'
    return res.render(`./templates/products/edit`,getProduct)
  }else if(!isNaN(req.body.name) || isNaN(req.body.price) || isNaN(req.body.inventory)){
    getProduct.message = 'Please fill out all fields with the correct information Name = string , Price & Inventory = Numbers'
    return res.render(`./templates/products/edit`,getProduct)
  }
  dataBase.editProduct(req.params.id,req.body)
  res.redirect('/products')
})
router.delete('/:id', (req,res) => {
  dataBase.deleteProduct(req.params)
res.redirect('/products')
})
module.exports = router;
