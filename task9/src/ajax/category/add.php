<?php
require_once ("../../Category.php");
$user = new Category();
$user->add(json_decode($_POST['json']));
print_r(json_decode($_POST['json']));