
/* 系统级别的扩展 */
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