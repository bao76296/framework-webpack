import SMERouter from  'sme-router';
import home from '../controller/home';
import book from '../controller/book';

const not_found_template = require('../views/404.html');

let router = null;

const init = () => {

    btnAddEvent();

    router = new SMERouter('router-view');
    
    
    //中间件
    
    router.use((req, res, next) => {
        changeContentHeader(
            $('.sidebar-menu li').removeClass('active').filter((item, ele) => {
                return $(ele).data('to') == req.route;
            }).addClass('active').text()
        )
    })
    
    router.route('/home', home.render)

    router.route('/bookList', book.render)
    
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

    
}

const btnAddEvent = () => {
    $('.sidebar-menu [data-to]').on('click', function() { $(this);
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