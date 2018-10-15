let Post = {
    add:function(json){
        console.log(json)
    },
    posts:"",
    load:function(){

    },
    loadPost: function (func) {
        $.ajax({
            type: "POST",
            url: "src/ajax/post/load.php",
            data: {}
        }).done(function (result) {
            Post.posts = result;
            func();
        })
    },
    loadCategory: function () {
        let res = JSON.parse(Category.categories);
        let str = "<p>Category</p><select>";
        for (let item in res) {
            str += "" +
                "<option data-id='" + res[item].id + "'>" +
                "" + res[item].name + "" +
                "</option>";
        }
        str += "</select>";
        $(".block_category").html(str);
    },
    loadUser: function () {
        let res = JSON.parse(User.users);
        let str = "<p>User</p><select>";
        for (let item in res) {
            str += "" +
                "<option data-id='" + res[item].id + "'>" +
                "" + res[item].name + "" +
                "</option>";
        }
        str += "</select>";
        $(".block_user").html(str);
    },
    event: function () {
        $(".add").click(function () {
            let json = {};
            json.content = $(".content_text").val();
            json.status = $(".status_number").val();
            json.id_user = $(".block_user select :selected").attr('data-id');
            json.id_category = $(".block_category select :selected").attr('data-id');
            json.time_create = dat_format_input(new Date().getTime());
            Post.add(json);
            console.log("work")
        })
    }
};