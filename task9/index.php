
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Post</title>
    <link rel="stylesheet" href="../bootstrap/bootstrap-grid.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style_post.css">
</head>
<body>
<?php
require_once ("src/header.php");
?>
<div class="container">
    <div class="row">
        <div class="form">
            <div class="block_content">
                <p>Content</p>
                <textarea class="content_text"></textarea>
                <div class="content_text_error"></div>
            </div>
            <div class="block_status">
                <p>Status</p>
                <input class="status_number" type="number">
                <div class="status_number_error"></div>
            </div>
            <div class="user_and_category">
                <div class="block_user">

                </div>
                <div class="block_category">

                </div>
            </div>
            <div class="add">Add</div>
        </div>
        <div class="post_load col-12">

        </div>
    </div>
</div>
<div class="update">
    <div class="update_info">
        <div class="update_info1">
            <div class="update_user"></div>
            <div class="update_category"></div>
            <div class="update_status_block">
                <p>Status : </p>
                <input class="update_status" type="number">
                <div class="update_status_error"></div>
            </div>
            <div class="update_time"></div>
        </div>
        <div class="textarea_block">
            <textarea class="update_content"></textarea>
            <div class="update_content_error"></div>
        </div>
    </div>
    <div class="update_setting">
        <div class="update_save">Save</div>
        <div class="update_exit">Exit</div>
    </div>
</div>
<div class="overlay"></div>
<script type="text/javascript" src="../jquery/jquery.js"></script>
<script type="text/javascript" src="js/valid.js"></script>
<script type="text/javascript" src="js/help_func.js"></script>
<script type="text/javascript" src="js/User.js"></script>
<script type="text/javascript" src="js/Category.js"></script>
<script type="text/javascript" src="js/Post.js"></script>
<script type="text/javascript" src="js/script_post.js"></script>

</body>
</html>