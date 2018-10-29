import vs from '../../config';
const { version } = vs;

const isLogIn = () => {
    return $.ajax({
        url : '/api/' + version + '/user/isLogIn',
        success : (res) => {
            return res
        }
    })
}


const info = () => {
    return $.ajax({
        url : '/api/' + version + '/user/info',
        success : (res) => {
            return res
        }
    })
}

const exit = () => {
    return $.ajax({
        url : '/api/' + version + '/user/exit',
        success : (res) => {
            return res
        }
    })
}

const check = (data) =>{
    return $.ajax({
        url : '/api/' + version + '/user/check',
        data : { data },
        success : (res) => {
            return res
        }
    })
}

export default {
    isLogIn,
    info,
    exit,
    check
}