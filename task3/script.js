window.onload = function () {
    //load();
};
let load = function () {
    let arr = ajax('GET', 'https://dog.ceo/api/breed/hound/list', false);
    if(arr !=200){
        return alert("Ошибка " + arr);
    }
    arr = arr.message;
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
    if (xhr.status == 200) {
        return JSON.parse(xhr.responseText);
    }
    return xhr.status;
};