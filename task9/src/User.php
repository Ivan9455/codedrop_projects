<?php
require_once("database/DataBase.php");

class User
{
    private $db;

    public function __construct()
    {
        $database = new DataBase();
        $this->db = $database->getConnect();
    }

    public function getUsers()
    {
        $sql = "SELECT * FROM `User`";
        $res = mysqli_query($this->db, $sql);
        return mysqli_fetch_array($res, MYSQLI_ASSOC);
    }

}