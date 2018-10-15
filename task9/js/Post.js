let Post = {
    add: function (json) {
        console.log(json);
        $.ajax({
            type: "POST",
            url: "src/ajax/post/add.php",
            data: {json: JSON.stringify(json)}
        }).done(function () {
            Post.loadUser(Post.load)
        })
    },
    posts: "",
    load: function () {
        let res = JSON.parse(Post.posts)
        let str = "";
        for (let i in res) {
            str += "" +
                "<div class='item'>" +
                "<div class='item_info'>" +
                "" +
                "</div>" +
                "<div class='item_setting'>" +
                "<div class='item_edit' data-id='" + res[i].id + "'>Edit</div> " +
                "<div class='item_remove' data-id='" + res[i].id + "'>Remove</div> " +
                "</div>" +
                "</div>"
        }
        $(".post_load").html(str);
        //дописать отображение постов
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
            json.user_id = $(".block_user select :selected").attr('data-id');
            json.category_id = $(".block_category select :selected").attr('data-id');
            json.created_at = dat_format_input(new Date().getTime());
            if (Valid.content(json.content, ".content_text", ".content_text_error") &
                Valid.status(json.status, ".status_number", ".status_number_error")) {
                Post.add(json);
            }
        })
    }
};