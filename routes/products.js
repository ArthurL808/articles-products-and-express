const express = require("express");
const router = express.Router();

const errors = { error: "" };

router.get(`/`, (req, res) => {
  return req.db.Product.fetchAll().then(results => {
    let all = results.toJSON()
    if(all.length < 1){
      all.message = 'No products avalible'
    }
    res.render("./templates/products/index", {all:all});
  });
});

router.get(`/new`, (req, res) => {
  res.render("./templates/products/new", errors);
});

router.get(`/:id/edit`, (req, res) => {
   return req.db.Product.forge({id:`${req.params.id}`}).fetch().then(results=>{ 
     let product = results.toJSON()
    if (errors.error) {
      product.error = errors.error;
    } else {
      product.error = "";
    }
    res.render(`./templates/products/edit`, product);
  });   
  })

router.get(`/:id`, (req, res) => {
  return req.db.Product.forge({id:`${req.params.id}`}).fetch().then(results=>{
      let product = results.toJSON()
      if (!product) {
        product = errors;
        product.error = "Product does not exisit";
      } else {
        product.error = "";
      }
    res.render("./templates/products/products", product);
  })
});
    


router.post(`/`, (req, res) => {
  if (
    req.body.name === "" ||
    req.body.price === "" ||
    req.body.inventory === ""
  ) {
    errors.error =
      "Please fill out all fields with the correct information Name = string , Price & Inventory = Numbers";
    return res.redirect("/products/new");
  } else if (
    !isNaN(req.body.name) ||
    isNaN(req.body.price) ||
    isNaN(req.body.inventory)
  ) {
    errors.error =
      "Please fill out all fields with the correct information Name = string , Price & Inventory = Numbers";
    return res.redirect("/products/new");
  }
  errors.error = "";
   return req.db.Product.forge({
    name: `${req.body.name}`,
    price: `${req.body.price}`,
    inventory: `${req.body.inventory}`
  }).save().then(results=>{
    res.redirect("/products");
  })

});
router.put(`/:id`, (req, res) => {
  if (
    req.body.name === "" ||
    req.body.price === "" ||
    req.body.inventory === ""
  ) {
    errors.error =
      "Please fill out all fields with the correct information Name = string , Price & Inventory = Numbers";
    return res.redirect(`/products/${req.params.id}/edit`);
  } else if (
    !isNaN(req.body.name) ||
    isNaN(req.body.price) ||
    isNaN(req.body.inventory)
  ) {
    errors.error =
      "Please fill out all fields with the correct information Name = string , Price & Inventory = Numbers";
    return res.redirect(`/products/${req.params.id}/edit`);
  }
  errors.error = "";
  return req.db.Product.forge({id:`${req.params.id}`}).save({name:`${req.body.name}`,price: `${req.body.price}`,inventory: `${req.body.inventory}`}).then(result=>{
    res.redirect(`/products/${req.params.id}`);
  })
});
router.delete("/:id", (req, res) => {
  return req.db.Product.forge({id:`${req.params.id}`}).destroy().then(results=>{
    let product = results
    if (!product) {
      return res.redirect(`/products/${req.params.id}`);
    }
    if (isNaN(req.params.id)) {
      return res.redirect(`/products/${req.params.id}`);
    }
    errors.error = "";
res.redirect("/products");
  })
});
module.exports = router;
