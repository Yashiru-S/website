<?php

include 'User.php';

$user = new User('nsi_yasser', 'localhost', 'root','root');

$user->create('admin','password');