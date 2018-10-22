import '../css/app.scss';
import router from './routes';

const body_html = require('./views/body.html');


$('.wrapper').html(body_html);

console.log(router.init())