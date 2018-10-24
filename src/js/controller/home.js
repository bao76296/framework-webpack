const home_template = require('../views/home.html');

const render = (req, res, next) =>　{
    res.render(home_template)
}

export default {
    render
}