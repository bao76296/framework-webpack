
const bookList = () => {
    return $.ajax({
        url : '/api/v1/books/list',
        type : 'get',
        success : data => {return data;}
    })
}

export default {
    bookList
}