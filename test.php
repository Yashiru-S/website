<?php
$serveur = "localhost";
$login = "root";
$password = "root";
try {
    $connexion = new PDO("mysql:host=$serveur;dbname=nsi_yasser", $login, $password);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $requete1 = $connexion->prepare(
        "SELECT Last_Name from users"
    );
    $requete1->execute();
    $resultat = $requete1->fetchall();
}
catch(PDOException $e) {
    echo 'Echec:  ' .$e->getMessage();
}
?>
