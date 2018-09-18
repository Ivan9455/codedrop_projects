window.onload = function () {
    load();
};
let load = function () {
    let arr = ajax('GET', 'https://dog.ceo/api/breed/hound/list', false).message;//список парод
    let rand = Math.floor(Math.random() * arr.length);
    let hound_list = arr[rand];
    document.title = hound_list;
    let load_random_image = ajax('GET', 'https://dog.ceo/api/breed/hound/' + hound_list + '/images', false).message;
    let rand2 = Math.floor(Math.random() * load_random_image.length);
    document.getElementById("loading").innerHTML = "" +
        "<img src='"+load_random_image[rand2]+"'>";
};


let ajax = function (method, url_api, asinc) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url_api, asinc);
    xhr.send();
    if (xhr.status != 200) {
        return xhr.status;
    } else {
        return JSON.parse(xhr.responseText);
    }
};