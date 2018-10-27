import SMERouter from  'sme-router';
import home from '../controller/home';
import book from '../controller/book';
import btnEvent from '../util/eveE';
import { headerText } from '../models/body-header';
import header_html from '../views/book/book-header.html';
import url from 'url'

const not_found_template = require('../views/404.html');

let router = null;

const init = () => {

    btnAddEvent();

    router = new SMERouter('router-view');
    
    
    // //中间件
    // router.use((req) => {
    //     console.log(req,6) 

    //     // changeContentHeader(
    //     //     $('.sidebar-menu li[data-to]').removeClass('active').filter(`[data-to='${req.route}']`).addClass('active').text()
    //     // )
    //     // console.log( $('.sidebar-menu li[data-to]').removeClass('active').filter(`[data-to='${req.route}']`).addClass('active').text(),7)
    // })

    router.route('/',function(req, res, next){
        console.log(req);
        console.log(headerText)
        let pathname = url.parse(req.url).pathname;
        $('.sidebar-menu li[data-to]').removeClass('active').filter(`[data-to='${ pathname }']`).addClass('active')
        var _html = template.render(header_html, headerText[pathname]);
        $('.content-header').html(_html);
    })
    
    router.route('/home', home.render)

    router.route('/abookList', book.list)
    router.route('/bookSave', book.save)
    router.route('/bookUpdate', book.update)
    
    router.route('/notfound', (req,res) => {
        res.render(not_found_template);
        changeContentHeader('404 Error Page');
    })

    router.route('*', (req, res) => {
        if(req.url == ''){
            res.redirect('/home');
        } else {
            res.redirect('/notfound');
        }
        
    })

    btnEvent.on('go', (path, args = {}) => {router.go(path, args)});
    btnEvent.on('back', () => { router.back()})
    
}

const btnAddEvent = () => {
    $('.sidebar-menu li[data-to]').on('click', function() { $(this);
        router.go($(this).data('to'))
    })
}

const changeContentHeader = (text) => {
    $('.content-header h1').text(text);
    // $('.content-header h1').html('Page Header        <small>Optional description</small> ')
}


export default {
    init
}