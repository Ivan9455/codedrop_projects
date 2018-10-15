<?php
require_once ("../../Post.php");
$post = new Post();
$post->add(json_decode($_POST['json']));