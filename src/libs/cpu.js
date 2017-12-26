let cpu = {

};
cpu.title = function (title) {

};

// 取出空格
cpu.trim = function (str) {
    return !str ? '' : str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
};

// 判断对象是否有效（有效包括：不为空，并且有值），支持数组和字符串；
cpu.isEmpty = function (obj) {
    return !obj || obj.length == 0 || (typeof obj == 'string' && cpu.trim(obj).length == 0);
};

/* ajax 结合服务端 Messager 的操作*/
// that: vue当前的 this 对象
// src: 要 get 的 url
// tips：当前操作成功的提示（更友好的提示）
cpu.httpGet = function (that, src, callback) {
    that.$ajax
        .get(src)
        .then(function (response) {
            let ret = response.data;
            if (ret.success) {
                if (!!callback)
                    callback(ret.result);
            }
            else {
                throw ret.msg;
            }
        })
        .catch(function (ex) {
            cpu.error(that, ex + "<br/><b>src:</b> " + src + "");
        });
}


/* 统一全局提示信息 */
cpu.info = function (that, msg) {
    that.$Message.info({
        content: msg,
        duration: 5,
        closable: true
    });
}

cpu.error = function (that, msg) {
    that.$Message.error({
        content: msg,
        duration: 10,
        closable: true
    });
}

export default cpu;
