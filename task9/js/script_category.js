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
            $(".load").html()
        });
    }
}