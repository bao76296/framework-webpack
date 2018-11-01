

const pargeHeaderInfo = (pathname, serch) => {
    serch = serch || '';
    let headerText = {
        '/home' : {
            text : '首页',
            description : "",
            list : [
                {text : '首页'}
            ]
        },
        '/bookList' : {
            text : '图书信息',
            description : '图书列表',
            list : [
                {text : '图书列表' }
            ]
        },
        '/bookSave' : {
            text : '图书信息',
            description : '添加图书',
            list : [
                {text : '图书列表', path : '#/bookList' + serch },
                {text : '添加图书'}
            ]
        },
        '/bookUpdate' : {
            text : '图书信息',
            description : '修改信息',
            list : [
                {text : '图书列表', path : '#/bookList' + serch },
                {text : '修改信息'}
            ]
        },
        '/notfound' : {
            text : '404',
            description : '地址错误',
            list : []
        },
        '/map' : {
            text : '位置',
            description : '位置信息',
            list : [
                {text : '位置'}
            ]
        }

    }

    return headerText[pathname] ||  {};
}

let headerUrlName = ['/home','/bookList', '/bookSave', '/bookUpdate', '/map' ]
export {
    headerUrlName
}

export default {
    pargeHeaderInfo
}