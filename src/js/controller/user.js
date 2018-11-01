
import user_model from '../models/user';
const init = async () =>{
    
    var data = await user_model.info()
    console.log(data);
    $('.name').html(data.data.name);
    $('.exit').on('click', bindBtnExit)
}

const bindBtnExit = async () => {
    document.cookie = 'token=""';
   
    window.location.href = '/admin.html'
    
}


export default {
    init
}