let User = {
    add: function (name, email, status) {
        let json = {};
        json.name = name;
        json.email = email;
        json.status = status;
        console.log(json)
        $.ajax({
            type: "POST",
            url: "src/ajax/user/add.php",
            data: {
                json: JSON.stringify(json)
            }
        }).done(function (result) {
            User.loadUsers(User.load);
        });
    },
    remove: function (id) {
        $.ajax({
            type: "POST",
            url: "src/ajax/user/remove.php",
            data: {id: id}
        }).done(function () {
            User.loadUsers(User.load);
        });
    },
    removeValid:function(id){
        $.ajax({
            type: "POST",
            url: "src/ajax/post/getuser.php",
            data: {id: id}
        }).done(function (result) {
            if(result==0){
                User.remove(id)
            }
            else{
                alert("Не возможно удалить user \n " +
                    "пока у него есть post!");
            }
        });
    },
    updateOpen: function (id) {
        $(".overlay").css("display", "block");
        $(".update").css("display", "block");
        $(".update_save").attr("data-id", id);
        $.ajax({
            type: "POST",
            url: "src/ajax/user/get_user.php",
            data: {id: id}
        }).done(function (result) {
            let json = JSON.parse(result);
            $(".update_name").val(json.name);
            $(".update_email").val(json.email);
            $(".update_status").val(json.status);
        });
    },
    update(json) {
        console.log(json)
        $.ajax({
            type: "POST",
            url: "src/ajax/user/user_update.php",
            data: {json: JSON.stringify(json)}
        }).done(function (result) {
            User.loadUsers(User.load);
        });
    },
    event: function () {
        $(".add").click(function () {
            let name = $(".name").val();
            let email = $(".email").val();
            let status = $(".status").val();
            if (Valid.name(name, ".name", ".name_error") &
                Valid.email(email, ".email", ".email_error") &
                Valid.status(status, ".status", ".status_error")) {
                User.add(name, email, status);
            }
        });
        $(".load").on('click', ".item_remove", function () {
            User.removeValid($(this).attr("data-id"));
        });
        $(".load").on('click', ".item_edit", function () {
            User.updateOpen($(this).attr("data-id"));
        })
    },
    eventUpdate: function () {
        $(".update_save").click(function () {
            let json = {};
            json.id = $(this).attr("data-id");
            json.name = $(".update_name").val();
            json.email = $(".update_email").val();
            json.status = $(".update_status").val();
            User.update(json);
            $(".overlay").css("display", "none");
            $(".update").css("display", "none");
        });
        $(".update").on('click', ".update_exit", function () {
            $(".overlay").css("display", "none");
            $(".update").css("display", "none");
        })
    },
    users: "",
    loadUsers: function (func) {
        $.ajax({
            type: "POST",
            url: "src/ajax/user/load.php",
            data: {}
        }).done(function (result) {
            User.users = result;
            func();
        })
    },
    load: function () {
        let result = User.users;
        let str = ""
        for (let item in result) {
            let json = JSON.parse(result)[item]
            if (json === undefined) {
                break;
            }
            str += "" +
                "<div class='item'>" +
                "<div class='item_info'>" +
                "<div class='item_name'>name : " + json.name + "</div>" +
                "<div class='item_email'>email : " + json.email + "</div>" +
                "<div class='item_status'>status : " + json.status + "</div>" +
                "</div>" +
                "<div class='item_setting'>" +
                "<div class='item_edit' data-id='" + json.id + "'>Edit</div>" +
                "<div class='item_remove' data-id='" + json.id + "'>Remove</div>" +
                "</div>" +
                "</div>";
        }
        $(".load").html(str);
    }
};