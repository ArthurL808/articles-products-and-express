
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {name: 'red',price:23,inventory:100},
        {name: 'blue',price:20,inventory:120},
        {name: 'green',price:10,inventory:200}
      ]);
    });
};
