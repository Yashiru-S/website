<?php

include 'user.php';

$user = new User('nsi_yasser', 'localhost', 'root', 'root');

$username = $_POST['username'];
$password = $_POST['password'];

if ($user->exists($username, $password)) {
    $_SESSION['login'] = true;
    echo "member";
    header('member.php');
} else {
    header("index.php?message=".urlencode('incorrect username or password'));
    echo "Fail";
    exit();
}
?>