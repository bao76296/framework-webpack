import URL from 'url'
import header_html from '../views/book/book-header.html';
import header_info from '../models/body-header';

const render_header =  (req, search) => {
    let req_url = URL.parse(req.url)
    let pathname = req_url.pathname;
    $('.sidebar-menu li[data-to]').removeClass('active').filter(`[data-to='${ pathname }']`).addClass('active')


    let data = header_info.pargeHeaderInfo(pathname,search);
    var _html = template.render(header_html, {
        data : data
    });
    $('.content-header').html(_html);
}

export default render_header;