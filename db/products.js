let products = [
    {
      name: "red",
      price: 23,
      inventory: 100,
      id: 1
    },
    {
      name: "blue",
      price: 20,
      inventory: 120,
      id: 2
    },
    {
      name: "yellow",
      price: 10,
      inventory: 200,
      id: 3
    }
  ];

  let getAll = function() {
    return products;
  };

  let addProduct = function(name, price, inventory) {
    let product = {};
    product.name = name;
    product.price = parseInt(price);
    product.inventory = parseInt(inventory);
    product.id = products.length + 1;
    products.push(product);
  };
  let editProduct = function (){

  }
  let getProduct = function(id) {
      products.filter(function (product) {
          let found = product.id === parseInt(id)
          return found
      })
  };
  module.exports = {
      getAll,
      addProduct,
    getProduct }

