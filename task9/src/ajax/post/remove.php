<?php
require_once ("../../Post.php");
$post = new Post();
$post->remove($_POST['id']);