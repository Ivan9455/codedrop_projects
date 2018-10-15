<?php
require_once ("../../Post.php");
$post = new Post();
print_r($post->getUser($_POST['id']));