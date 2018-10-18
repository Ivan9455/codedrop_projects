<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>User</title>
<!--    <link rel="stylesheet"-->
<!--          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"-->
<!--          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"-->
<!--          crossorigin="anonymous">-->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style_user.css">
</head>
<body
<?php
require_once("src/header.php");
?>
<div class="container">
    <div class="row">
        <div class="form">
            <div class="form">
                <div class="block_name">
                    <p>Name</p>
                    <input type="text" class="name" maxlength="15">
                    <div class="name_error block_error"></div>
                </div>
                <div class="block_email">
                    <p>Email</p>
                    <input type="email" class="email" maxlength="50">
                    <div class="email_error block_error"></div>
                </div>
                <div class="block_status">
                    <p>Status</p>
                    <input type="number" class="status" min="0" max="99999999999">
                    <div class="status_error block_error"></div>
                </div>
                <div class="add">Add</div>
            </div>
            <div class="load">

            </div>
        </div>
    </div>
</div>
<div class="update">
    <div class="update_info">
        <label >name :
            <input type="text" class="update_name">
        </label>
        <label>email :
            <input type="text" class="update_email">
        </label>
        <label>status :
            <input type="text" class="update_status">
        </label>
    </div>
    <div class="update_setting">
        <div class="update_save">Save</div>
        <div class="update_exit">Exit</div>
    </div>
</div>
<div class="overlay"></div>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
<script type="text/javascript" src="js/valid.js"></script>
<script type="text/javascript" src="js/User.js"></script>
<script type="text/javascript" src="js/script_user.js"></script>
</body>
</html>