<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Menu</title>
</head>
<body>

<?php

echo "work<br>";
$file = scandir("./");
for ($i = 2; isset($file[$i]); $i++) {
    echo "<a href=" . $file[$i] . ">" . $file[$i] . "</a><br>";
}

?>
</body>
</html>
