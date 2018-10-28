import books_models from '../models/books';
import btnEvent from '../util/eveE';
import handleToastOndata from '../util/handleToastOnData';
const bookList_template = require('../views/book/book-list.html');
const bookSave_template = require('../views/book/book-save.html');
const bookUpdate_template = require('../views/book/book-update.html')

//显示列表
const list = async (req, res, next) => {
    req.query = req.query || {};
    let qurey = {
        pageNo : req.query.pageNo,
        pageSize : req.query.pageSize,
        serch : req.query.serch
    }
    console.log(qurey)
    let _data = await books_models.bookList(req.query);
    var _html = template.render(bookList_template, {
        data : _data.data
    })
    res.render(_html);
    listBtnBindEvent(qurey);
}

const listBtnBindEvent = (qurey) => {
    $('#toSave').on('click', () => { btnEvent.emit('go', '/bookSave')})
    $('.btnChange').on('click', function() {
        btnEvent.emit('go', '/bookUpdate', {id : $(this).parents('tr').data('id')})
    })
    $('.btnDelete').on('click', function(){
        handleBtnDelete.bind(this,qurey)();
    })
    $('#search').on('click', function(){
        var data = $('#searchValue').val();
        btnEvent.emit('go', '/bookList?serch=' + data)
    })
}

const handleBtnDelete = async function(qurey) {
    console.log(qurey.pageNo)
    qurey.pageNo = qurey.pageNo ? qurey.pageNo : 1;  
    let id = $(this).parents('tr').data('id');
    let result = await books_models.bookDelete({id : id, pageNo : qurey.pageNo});
    result.delete = id;
    handleToastOndata(result, 'code', {
        success : (data) => {
            if(data.data.isback){
                qurey.pageNo -= 1;
            }
            btnEvent.emit('go', '/bookList?pageNo=' + qurey.pageNo + '&_=' + data.delete)
        }
    })
}
 
//保存
const save = async (req, res, next) => {
    res.render(bookSave_template)
    saveBtnbindEvent();
}

const saveBtnbindEvent = () => {
    $('#back').on('click', function(){
        btnEvent.emit('go', '/bookList');
    }) 
    $('form').submit(handleSubmitSave)
}

let isLoading = false;
const handleSubmitSave = async function(e) {
    e.preventDefault();
    if(isLoading) return false;
    let _data = $(this).serialize();
    isLoading = true;
    $('.form-horizontal button').addClass('disabled')
    let result = null;
    if($('input[type="hidden"]').length == 0){
        result = await books_models.bookSave(_data);
    } else {
        let _data = $(this).serialize();
        result = await books_models.bookUpdate(_data)
    }
   
   
    isLoading = false;
    handleToastOndata(result,'code',{
        success : () => {
            btnEvent.emit('go', '/bookList')
        },
        fail : ()=>{
            $('.form-horizontal button').removeClass('disabled')
        }
    })
}

//修改更新
const update = async(req, res, next) => {
    let { id } = req.body;
    let result = await books_models.bookListOne({id});
   
    let _html = template.render(bookUpdate_template, {data : result.data[0]});
    res.render(_html);
    saveBtnbindEvent();
}




export default {
    list,
    save,
    update
};