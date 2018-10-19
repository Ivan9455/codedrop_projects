let f_Date = function (str) {
    str += "";
    if (str.length === 1) {
        return "0" + str;
    } else {
        return str;
    }
};
let dat_format_input = function (t) {
    return new Date(t).getFullYear() + "-" +
        f_Date(new Date(t).getMonth() + 1) + "-" +
        f_Date(new Date(t).getDate()) + " " +
        f_Date(new Date(t).getHours()) + ":" +
        f_Date(new Date(t).getMinutes() + ":" +
            f_Date(new Date(t).getSeconds()));
};
let dat_format = function (t) {
    return f_Date(new Date(t).getDate()) + "-" +
        f_Date(new Date(t).getMonth() + 1) + "-" +
        new Date(t).getFullYear() + " " +
        f_Date(new Date(t).getHours()) + ":" +
        f_Date(new Date(t).getMinutes());
}