let Category = {
    add: function (name, status) {
        let json = {};
        json.name = name;
        json.status = status;
        $.ajax({
            type: "GET",
            url: "/category/get/add",
            data: {json: JSON.stringify(json)}
        }).done(function (result) {
            Category.load(Category.loadCategory);
        })
    },
    updateOpen: function (id) {
        let json = {};
        json.id = id;
        $(".overlay").css("display", "block");
        $(".update").css("display", "block");
        $(".update_save").attr("data-id", id);
        $.ajax({
            type: "GET",
            url: "/category/get/get",
            data: {json: JSON.stringify(json)}
        }).done(function (result) {
            let json = JSON.parse(result);
            $(".update_name").val(json.name);
            $(".update_status").val(json.status);
        });
    },
    update: function (json) {
        $.ajax({
            type: "GET",
            url: "/category/get/update",
            data: {json: JSON.stringify(json)}
        }).done(function (result) {
            Category.load(Category.loadCategory);
        });
    },
    remove: function (id) {
        let json = {};
        json.id = id;
        $.ajax({
            type: "GET",
            url: "/category/get/remove",
            data: {json: JSON.stringify(json)}
        }).done(function () {
            Category.load(Category.loadCategory);
        });
    },
    removeValid: function (id) {
        let json = {};
        json.id = id;
        $.ajax({
            type: "GET",
            url: "/category/get/getCategory",
            data: {json: JSON.stringify(json)}
        }).done(function (result) {
            if (result == 0) {
                Category.remove(id)
            }
            else {
                alert("Не возможно удалить category \n " +
                    "пока он содержиться хоть в одном post !");
            }
        });
    },
    event: function () {
        $(".add").click(function () {
            let name = $(".name").val();
            let status = $(".status").val();
            if (Valid.name(name, ".name", ".name_error") &
                Valid.status(status, ".status", ".status_error")) {
                Category.add(name, status);
            }
        })
        $(".category_load").on('click', ".item_remove", function () {
            Category.removeValid($(this).attr("data-id"));
        });
        $(".category_load").on('click', ".item_edit", function () {
            Category.updateOpen($(this).attr("data-id"));
        })
    },
    eventUpdate: function () {
        $(".update_save").click(function () {
            let json = {};
            json.id = $(this).attr("data-id");
            json.name = $(".update_name").val();
            json.status = $(".update_status").val();
            Category.update(json);
            $(".overlay").css("display", "none");
            $(".update").css("display", "none");
        });
        $(".update").on('click', ".update_exit", function () {
            $(".overlay").css("display", "none");
            $(".update").css("display", "none");
        })
    },
    categories: "",
    load: function (func) {
        return $.ajax({
            type: "POST",
            url: "/category/post/getS",
        }).done(function (result) {
            Category.categories = result;
            func();
            console.log("done load_category")
        }).success(function () {
            console.log("success load_category")
            return true;
        })
    },
    loadCategory: function () {
        let result = Category.categories;
        let str = "";
        for (let item in result) {
            let json = JSON.parse(result)[item]
            if (json === undefined) {
                break;
            }
            str += "" +
                "<div class='item'>" +
                "<div class='item_info'>" +
                "<div class='item_name'>name : " + json.name + "</div>" +
                "<div class='item_status'>status : " + json.status + "</div>" +
                "</div>" +
                "<div class='item_setting'>" +
                "<div class='item_edit' data-id='" + json.id + "'>Edit</div>" +
                "<div class='item_remove' data-id='" + json.id + "'>Remove</div> " +
                "</div>" +
                "</div>"
        }
        $(".category_load").html(str);
    }
}