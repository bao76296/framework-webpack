import '../css/app.scss';
import router from './routes';
import render from './controller/book-list'

const body_html = require('./views/body.html');


$('.wrapper').html(body_html);

router.init()