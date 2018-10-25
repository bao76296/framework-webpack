import vs from '../../config'

const { version } = vs;

const bookList = (data = {}) => {
    return $.ajax({
        url : '/api/' + version + '/books/list',
        data,
        type : 'get',
        success : data => {return data;}
    })
}

const bookSave = (data) => {
    return $.ajax({
        url : '/api/' + version + '/books/save',
        type : 'POST',
        data,
        success : res => { return res }
    })
}

const bookDelete = (data) => {
    return $.ajax({
        url : '/api/' + version + '/books/delete',
        data,
        success : res => { return res }
    })
}

const bookUpdate = (data) => {
    console.log(data)
    return $.ajax({
        url : '/api/' + version + '/books/update',
        type : 'POST',
        data,
        success : res => { return res }
    })
}

export default {
    bookList,
    bookSave,
    bookDelete,
    bookUpdate
}