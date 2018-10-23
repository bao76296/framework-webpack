import SMERouter from  'sme-router';

const home_template = require('../views/home.html');
const two_template = require('../views/book-list.html');
const not_found_template = require('../views/404.html');

let router = null;

const init = () => {

    btnAddEvent();

    router = new SMERouter('router-view');
    
    
    //中间件
    router.use((req, res, next) => {
       $('.sidebar-menu li[to = "' + req.route + '" ]').find('a').click();
    })
    
    router.route('/home', (req, res, next) => {
        res.render(home_template)
    })

    router.route('/two', (req, res) => {
        res.render(two_template)
    })
    
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
    $('.sidebar-menu').on('click', (e) => {
        var that = $(e.target);
        router.go(
            that.parent()
            .siblings()
            .removeClass('active')
            .end()
            .addClass('active')
            .attr('to')
        )
        changeContentHeader(that.text())
    })
}

const changeContentHeader = (text) => {
    $('.content-header h1').text(text);
    // $('.content-header h1').html('Page Header        <small>Optional description</small> ')
}


export default {
    init
}