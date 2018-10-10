<?php
require_once ("../../User.php");
$user = new User();
$user->remove($_POST['id']);
