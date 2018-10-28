import admin_html from '../views/admin/admin.html';
import admon_models from '../models/admin';

const render = () => {
    swiper_html('logIn');
    bindBtnEvent();
}

const bindBtnEvent = () => {
    $('.login-box-body').on('click', '.swiper-btn', function(){
        
        var type = $(this).data('type');
        swiper_html(type);
    })

    $('.login-box-body').on('submit', '#logIn', function(e){
        e.preventDefault();
        console.log(this)
    })

    $('.login-box-body').on('submit', '#signIn', function(e){
        e.preventDefault()
        console.log($(this).serialize());
        admon_models.signIn($(this).serialize())
    })

}


const swiper_html = (type) => {

    var _html = template.render(admin_html,{
        type : type
    });
    $('.login-box-body').html(_html)

}



export default {
    render
}