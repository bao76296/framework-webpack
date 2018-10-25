const toast = (text, time)=> {
    $.toast({ 
        text , 
        showHideTransition : 'fade',
        allowToastClose : false,
        hideAfter : time,
        stack : 5,
        textAlign : 'left',
        position : 'top-center',
    })
}
export default toast;