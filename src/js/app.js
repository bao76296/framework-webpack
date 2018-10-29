import '../css/app.scss';
import router from './routes';
import user from './controller/user'

const body_html = require('./views/body.html');

import login from './util/isLogin'

const render =  async () => {
    if(await login.islogIn()){
        $('.wrapper').html(body_html);
        router.init()

        await user.init();

    } else {
        window.location.href = '/admin.html';
    }
}

render();


