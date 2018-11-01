
import user_model from '../models/user';
const init = async () =>{
    let token = localStorage.getItem('token') || '';
    var data = await user_model.info({
        token : token
    })

    $('.name').html(data.data.name);
    $('.exit').on('click', bindBtnExit)
}

const bindBtnExit = async () => {
    window.localStorage.removeItem('token');
   
    window.location.href = '/admin.html'
    
}


export default {
    init
}