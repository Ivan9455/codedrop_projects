<?php
require_once ("../../Category.php");
$category = new Category();
$json = json_decode($_POST['json']);
print_r($category->updateCategory($json));