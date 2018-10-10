<?php
require_once("database/DataBase.php");

class User
{
    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    public function getUsers()
    {
        $sql = "SELECT * FROM `User`";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr;
    }

}