import books_models from '../models/books';
const bookList_template = require('../views/book-list.html');

const render = async (req, res, next) => {
    let _data = await books_models.bookList();
    console.log(_data)
    var _html = template.render(bookList_template, {
        data : _data.data
    })
    res.render(_html)
}


export default {
    render
};