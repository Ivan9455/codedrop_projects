let Valid = {
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