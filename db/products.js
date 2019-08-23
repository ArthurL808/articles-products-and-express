let products = [
  {
    name: "red",
    price: 23,
    inventory: 100,
    id: 0
  },
  {
    name: "blue",
    price: 20,
    inventory: 120,
    id: 1
  },
  {
    name: "green",
    price: 10,
    inventory: 200,
    id: 2
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
  product.id = products.length;
  products.push(product);
  let arr = products.map(function (e) {
    return e.id
  })
  let isDuplicate = arr.some(function (e,idx) {
    return arr.indexOf(e) != idx
  })
  if(isDuplicate === true){
    product.id += 1
  }
  console.log(arr)
  console.log(product.id)
  console.log(isDuplicate)
};
let editProduct = function(id, data) {
  let edit = getProduct(id);
  for (var key in data) {
    edit[key] = data[key];
  }
};
let getProduct = function(id) {
  for (let i = 0; i < products.length; i++) {
    if (id == products[i].id) {
      return products[i];
    }
  }
};
let deleteProduct = function(id) {
  products = products.filter(current => {
    return current.id !== parseInt(id.id);
  });
  return getAll()
};
module.exports = {
  getAll,
  addProduct,
  getProduct,
  editProduct,
  deleteProduct
};
