import SMERouter from  'sme-router';

const home_template = require('../views/home.html');
const two_template = require('../views/two.html');
const not_found_template = require('../views/404.html');


const init = () => {
    
    let router = new SMERouter('router-view');
    
    //中间件
    router.use((req, res, next) => {
        console.log('this is middlemodels')
    })
    
    router.route('/home', (req, res, next) => {
        res.render(home_template)
    })
}


export default {
    init
}