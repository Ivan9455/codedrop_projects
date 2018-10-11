<?php
require_once ("../../Category.php");
$category = new Category();
print_r(json_encode($category->getCategory($_POST['id'])));