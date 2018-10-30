import user_models from '../models/user';

const islogIn = async () => {

    let token = window.localStorage.getItem('token') || '';
    let data = await user_models.isLogIn({
        token : token
    });
    return data.code == 200;

   
    // return true;
    // return false; 
}

export default {
    islogIn
}