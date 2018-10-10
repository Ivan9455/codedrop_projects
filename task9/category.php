<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Category</title>
    <link rel="stylesheet" href="../bootstrap/bootstrap-grid.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style_category.css">
</head>
<body>
<?php
require_once("src/header.php");
?>
<div class="container">
    <div class="row">
        <div class="category">
            <p>name :</p>
            <input type="text" class="name">
            <p>status : </p>
            <input type="text" class="status">
            <div class="add_category">Add</div>
        </div>
        <div class="category_load col-12">

        </div>
    </div>
</div>
<script type="text/javascript" src="../jquery/jquery.js"></script>
<script type="text/javascript" src="js/script_category.js"></script>
</body>
</html>