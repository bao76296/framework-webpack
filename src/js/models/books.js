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


const bookListOne = (data = {}) => {
    return $.ajax({
        url : '/api/' + version + '/books/listOne',
        data,
        type : 'get',
        success : data => {return data;}
    })
}

const bookSave = (data) => {
    // return $.ajax({
    //     url : '/api/' + version + '/books/save',
    //     type : 'POST',
    //     data,
    //     success : res => { return res }
    // })

    return new Promise(function(resolve){
        $('#saveFrom').ajaxSubmit({
            url : '/api/' + version + '/books/save',
            type : 'POST',
            success : (results) =>{
                resolve(results)
            }
        })
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
    bookUpdate,
    bookListOne
}