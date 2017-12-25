let util = {

};
util.title = function (title) {

};
util.test = function (title) {
    return title;
};

// 取出空格
util.trim = function(str){
    return  !str ? '' : str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');  
};

// 判断对象是否有效（有效包括：不为空，并且有值），支持数组和字符串；
util.isEmpty = function(obj){
    return !obj || obj.length == 0 || (typeof obj=='string' && util.trim(obj).length == 0);
};


export default util;


Array.prototype.contain = function (item) {

    debugger;
    let len = this.length;
    var i;
    for(i=0; i<len; i++)
    {
        let obj = this[i];
        if(obj == item)
            return true;
    }

    return false;
}