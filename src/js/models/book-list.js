
const dataList = () => {
    return $.ajax({
        url : '/api/book/list',
        type : 'get',
        success : data => {return data;}
    })
}