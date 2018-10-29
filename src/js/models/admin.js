import vs from '../../config';

const { version } = vs;

const signIn = (data)=> {
    return $.ajax({
        url : '/api/' + version + '/admin/signIn',
        type : 'post',
        data,
        success : (res) => {
            return res
        }
    })
}

const logIn = (data)=> {
    return $.ajax({
        url : '/api/' + version + '/admin/logIn',
        type : 'post',
        data,
        success : (res) => {
           return res
        }
    })
}

export default {
    signIn,
    logIn
}