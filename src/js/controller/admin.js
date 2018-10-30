import admin_html from '../views/admin/admin.html';
import admin_models from '../models/admin';
import handleToastOnData from '../util/handleToastOnData';
import toast from '../util/toast';
const render = () => {
    swiper_html('logIn');
    bindBtnEvent();
}

const bindBtnEvent = () => {
    $('.login-box-body').on('click', '.swiper-btn', function(){
        
        var type = $(this).data('type');
        swiper_html(type);
    })

    $('.login-box-body').on('submit', '#logIn',async function(e){
        e.preventDefault();
        let data = await admin_models.logIn($(this).serialize());
        if(data.code == 200){
            window.location.href = '/';
            window.localStorage.token = data.data.token
        } else {
            toast(data.data,1000) 
        }
    })

    $('.login-box-body').on('submit', '#signIn',async function(e){
        e.preventDefault()
        let data = await admin_models.signIn($(this).serialize());
        if(~~data.code == 201){
            toast('账号已存在', 1000)
        } else if(~~data.code == 200){
            toast('注册成功', 1000)
            setTimeout(() => {
                swiper_html('logIn')
            },1000)
            
        } else {
            toast('无法预知的错误', 1000)
        }
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