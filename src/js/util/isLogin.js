import user_models from '../models/user';

const islogIn = async () => {

    let data = await user_models.isLogIn();
    return data.code == 200;

   
    // return true;
    // return false; 
}

export default {
    islogIn
}