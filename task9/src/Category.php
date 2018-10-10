<?php
require_once("database/DataBase.php");

class Category
{

    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    public function getCategories()
    {
        $sql = "SELECT * FROM `Category`";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr;
    }

}