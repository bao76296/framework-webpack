import '../css/app.scss';
import router from './routes';

const body_html = require('./views/body.html');

import login from './util/isLogin'

if(login.islogin()){
    $('.wrapper').html(body_html);

    router.init()
} else {
    window.location.href = '/admin.html';
}

