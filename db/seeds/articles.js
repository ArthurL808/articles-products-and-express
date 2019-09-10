
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {title: 'Dope boy magic',author: 'pablo',body: 'everyday is a strugle to live'},
        {title: 'American gangsta',author: 'Frank lucas',body: 'New york city a place where a man can turn a copper into gold'},
        {title: 'Drugs and the streets',author:'The corner boy',body:'The hustle never ends in these streets'}
      ]);
    });
};
