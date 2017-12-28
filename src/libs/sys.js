
/* 系统级别的扩展 */
Array.prototype.contains = function (item) {
    for (i in this) {
        if (this[i] == item) return true;
    }
    return false;
}