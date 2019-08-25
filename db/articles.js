let articles = [
  {
    title: "stuff",
    body: 'big stuffs',
    author: 'that guy',
    urlTitle: 'stuff'
  },
  {
    title: "blue fire",
    body: 'daft punk is cool',
    author: 'daft kids',
    urlTitle: 'blue-fire'
  }
];

let getAll = function() {
  return articles;
};

let addArticles = function(title, author, body) {
  let article = {};
  article.title = title;
  article.body = body;
  article.author = author;
  article.urlTitle = article.title.replace(/ /gi, '-',);

  articles.push(article);
};
let editArticles = function(id, data) {
  let edit = getArticles(id);
  for (var key in data) {
    edit[key] = data[key];
  }
  edit.urlTitle = edit.title.replace(/ /gi, '-',)
};
let getArticles = function(id) {
  for (let i = 0; i < articles.length; i++) {
    if (id == articles[i].urlTitle) {
      return articles[i];
    }
  }
};
let deleteArticles = function(id) {
  articles = articles.filter(current => {
    return current.urlTitle !== id.id;
  });
  return getAll();
};
module.exports = {
  getAll,
  addArticles,
  getArticles,
  editArticles,
  deleteArticles
};
