const bookshelf = require('../bookshelf')

class Article extends bookshelf.Model{
    get tabelName()
{
    return 'articles'
}
    get hasTimestamps(){
        return true
    }
}
module.exports = bookshelf.model('Article',Article)