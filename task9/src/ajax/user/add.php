<?php
require_once ("../../User.php");
$user = new User();
$json = json_decode($_POST['json']);
$user->add($json);
