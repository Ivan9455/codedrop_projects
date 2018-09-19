window.onload = function () {
    load_accordion();
    load_event();

};


let load_accordion = function () {
    let str = ajax('GET', 'https://dog.ceo/api/breed/hound/list', false);
    if (!isNaN(str)) {
        return alert("Ошибка " + str);
    }
    let arr = str.message;
    let info = "";
    for (let i = 0; i < arr.length; i++) {
        let load_random_image = ajax('GET', 'https://dog.ceo/api/breed/hound/' + arr[i] + '/images', false).message;
        let rand2 = Math.floor(Math.random() * load_random_image.length);
        info += "" +
            "<div>" +
            "<div class='item w'>" +
            "<div class='title'>" + arr[i] + "</div>" +
            "<div class='open_info'>" +
            "<div class='w1 w2'></div>" +
            "</div>" +
            "</div>" +
            "<div class='hidden w bl'>" +
            "<img src='" + load_random_image[rand2] + "' class='w'>" +
            "<div class='load_img w'></div>" +
            "<div class='button_load_img'>Загрузить</div> " +
            "</div>" +
            "</div>";
    }
    document.getElementsByClassName("accordion")[0].innerHTML = info;
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

let load_event = function () {
    let div = document.getElementsByClassName("w1");
    let button_load_img = document.getElementsByClassName("button_load_img");
    for (let i = 0; i < div.length; i++) {
        div[i].addEventListener('click', function () {
            if (this.parentElement.parentElement.parentElement.getElementsByClassName("w")[1].classList[0] === "hidden" ||
                this.parentElement.parentElement.parentElement.getElementsByClassName("w")[1].classList[1] === "hidden" ||
                this.parentElement.parentElement.parentElement.getElementsByClassName("w")[1].classList[2] === "hidden") {
                if (document.getElementsByClassName("w2").length === div.length - 1) {
                    for (let j = 0; j < div.length; j++) {
                        if (div[j].classList.length === 1) {
                            div[j].classList.add("w2");
                            div[j].parentElement.parentElement.parentElement.getElementsByClassName("open")[0].classList.add("hidden");
                            div[j].parentElement.parentElement.parentElement.getElementsByClassName("hidden")[0].classList.add("open");
                        }
                    }
                }
                this.classList.remove("w2");
                this.parentElement.parentElement.parentElement.getElementsByClassName("hidden")[0].classList.add("open");
                this.parentElement.parentElement.parentElement.getElementsByClassName("open")[0].classList.remove("hidden");
            } else {
                this.classList.add("w2");
                this.parentElement.parentElement.parentElement.getElementsByClassName("open")[0].classList.add("hidden");
                this.parentElement.parentElement.parentElement.getElementsByClassName("hidden")[0].classList.remove("open");
            }
        });
        button_load_img[i].addEventListener('click', function () {
            if (this.parentElement.getElementsByClassName("load_img")[0].innerHTML === "") {
                this.parentElement.getElementsByClassName("load_img")[0].innerHTML =
                    load_img(this.parentElement.parentElement.getElementsByClassName("title")[0].innerText.toLocaleLowerCase(), (i + 1) * 2);
            } else {
                this.parentElement.getElementsByClassName("load_img")[0].innerHTML +=
                    load_img(this.parentElement.parentElement.getElementsByClassName("title")[0].innerText.toLocaleLowerCase(), 2);
            }
        });
    }
};
let load_img = function (dog_lineage, con) {
    let load_random_image = ajax('GET', 'https://dog.ceo/api/breed/hound/' + dog_lineage + '/images', false)
    if (!isNaN(load_random_image)) {
        return alert("Ошибка " + load_random_image);
    }
    let json = load_random_image.message;
    let info = "";
    for (let i = 0; i < con; i++) {
        let rand2 = Math.floor(Math.random() * json.length);
        info += "<img class='w' src='" + json[rand2] + "'>"
    }
    return info;
};
