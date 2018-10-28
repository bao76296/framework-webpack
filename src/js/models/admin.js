import vs from '../../config';

const { version } = vs;

const signIn = (data)=> {
    return $.ajax({
        url : '/api/' + version + '/admin/signIn',
        type : 'post',
        data,
        success : (res) => {
            console.log(res)
        }
    })
}

export default {
    signIn
}