$(document).ready(function () {
    Category.event();
    Category.eventUpdate();
    Category.load();
});
let Category = {
    add: function (name, status) {
        let json = {};
        json.name = name;
        json.status = status;
        $.ajax({
            type: "POST",
            url: "src/ajax/category/add.php",
            data: {json:JSON.stringify(json)}
        }).done(function (result) {
            Category.load();
        })
    },
    updateOpen:function(id){
        $(".overlay").css("display", "block");
        $(".update").css("display", "block");
        $(".update_save").attr("data-id", id);
        $.ajax({
            type: "POST",
            url: "src/ajax/category/get_category.php",
            data: {id: id}
        }).done(function (result) {
            let json = JSON.parse(result);
            $(".update_name").val(json.name);
            $(".update_status").val(json.status);
        });
    },
    update:function(json){
        console.log(json)
        $.ajax({
            type: "POST",
            url: "src/ajax/category/category_update.php",
            data: {json: JSON.stringify(json)}
        }).done(function (result) {
            Category.load();
        });
    },
    remove:function(id){
        $.ajax({
            type: "POST",
            url: "src/ajax/category/remove.php",
            data: {id: id}
        }).done(function () {
            Category.load();
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
            Category.remove($(this).attr("data-id"));
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
    load: function () {
        $.ajax({
            type: "POST",
            url: "src/ajax/category/load.php",
            data: {}
        }).done(function (result) {
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
            $(".category_load").html(str)
        });
    }
}
