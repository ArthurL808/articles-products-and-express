const express = require("express");
const router = express.Router();
const dataBase = require('../db/products')

router.get(`/`, (req, res) => {
  
  res.send(dataBase.getAll());
});

router.post(`/`, (req, res) => {
  dataBase.addProduct(req.body.name,req.body.price,req.body.inventory)
  res.send(dataBase.getAll());
}); 
router.put(`/:id`, (req,res)=> {
  
  dataBase.editProduct(req.params.id,req.body)
  res.send(dataBase.getAll())
})
router.delete('/:id', (req,res) => {

res.send(dataBase.deleteProduct(req.params))
})
module.exports = router;
