import toast from './toast';
const none = () => {}
const handleToastBydata = (data, code, options ={}) => {
    let { success, fail, isReact } = {
        success : options.success || none,
        fail : options.fail || none,
        isReact : typeof options.isReact == 'undefined' ? true : options.isReact
    }
    if(data[code] == '200'){
        if(isReact) toast('操作成功',1000);
        setTimeout(() => {
            success(data);
        },1000)
        
    } else {
        if(isReact) toast('操作失败',1000);
        fail(data);
    }
}

export default handleToastBydata;