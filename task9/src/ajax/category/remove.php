<?php
require_once ("../../Category.php");
$category = new Category();
$category->remove($_POST['id']);
