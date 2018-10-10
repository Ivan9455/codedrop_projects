$(document).ready(function () {
    Category.event();
    Category.load();
});
let Category = {
    event:function () {
        
    },
    load:function () {
        $.ajax({
            type: "POST",
            url: "src/ajax/category/load.php",
            data: {}
        }).done(function (result) {
            console.log(result)
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