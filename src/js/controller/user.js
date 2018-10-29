
import user_model from '../models/user';
const init = async () =>{

    var data = await user_model.info()

    $('.name').html(data.data.name);
    $('.exit').on('click', bindBtnExit)
}

const bindBtnExit = async () => {
    let data = await user_model.exit();
    if(data.code == 200){
        window.location.href = '/admin.html'
    }
}


export default {
    init
}