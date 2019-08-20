const express = require("express");
const router = express.Router();
const dataBase = require('../db/products')

router.get(`/:id`, (req, res) => {
  console.log(dataBase.getProduct(req.params.id));
  res.send(dataBase.getProduct(req.params.id));
});

router.post(`/`, (req, res) => {
  dataBase.addProduct(req.body.name,req.body.price,req.body.inventory)
  res.send(dataBase.getAll());
}); 

router.delete('/:id', (req,res) => {
    console.log(req.params.id)
products = products.filter((current)=>{
    return current !== req.params.id;
})
res.send('ok')
})
module.exports = router;
