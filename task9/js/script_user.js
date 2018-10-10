$(document).ready(function () {
    User.event();
    User.load();
});

let User = {
    add: function (name, email, status) {
        let json = {};
        json.name = name;
        json.email = email;
        json.status = status;
        console.log(json)
        $.ajax({
            type: "POST",
            url: "/src/ajax/user/add.php",
            data:{
                json:JSON.stringify(json)
            }
        }).done(function (result) {
            console.log(result)
        });
    },
    event: function () {
        $(".add").click(function () {
            let name = $(".name").val();
            let email = $(".email").val();
            let status = $(".status").val();
            if (UserValid.name(name, ".name", ".name_error") &
                UserValid.email(email, ".email", ".email_error") &
                UserValid.status(status, ".status", ".status_error")) {
                User.add(name,email,status);
            }
            //User.add(name,email,status);
        })
    },
    load:function () {
        $.ajax({
            type: "POST",
            url: "src/ajax/user/load.php",
            data:{}
        }).done(function (result) {
            console.log(result)
        });
        // let str = ajax("POST","/src/ajax/user/load.php",false);
        // if (!isNaN(str)) {
        //     return console.log("Ошибка " + str);
        // }
        // //let arr = str.message;
        // console.log(str)
    }

};
let UserValid = {
    name: function (name, block, block_error) {
        if (name === "") {
            $(block_error).html("Заполните поле!");
            $(block).addClass("error");
            return false;
        } else if (name.length > 15) {
            $(block_error).html("Слишком длинное имя!");
            $(block).addClass("error");
            return false;
        } else {
            $(block_error).html("");
            $(block).removeClass("error");
            return true;
        }
    },
    email: function (email, block, block_error) {
        if (email === "") {
            $(block_error).html("Заполните поле!");
            $(block).addClass("error");
            return false;
        } else if (email.length > 50) {
            $(block_error).html("Слишком длинный Email!");
            $(block).addClass("error");
            return false;
        } else {
            $(block_error).html("");
            $(block).removeClass("error");
            return true;
        }
    },
    status: function (status, block, block_error) {
        if (status === "") {
            $(block_error).html("Заполните поле!");
            $(block).addClass("error");
            return false;
        } else if (isNaN(status)) {
            $(block_error).html("Не число!");
            $(block).addClass("error");
            return false;
        } else {
            $(block_error).html("");
            $(block).removeClass("error");
            return true;
        }
    },
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