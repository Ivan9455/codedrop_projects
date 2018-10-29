<?php

class Category
{

    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    public function getS()
    {
        $sql = "SELECT * FROM `category` ";
        $arr = [];
        foreach ($this->db->getConnect()->query($sql) as $row) {
            array_push($arr, $row);
        }
        return $arr;
    }

    public function remove($json)
    {
        $sql = "DELETE FROM `category`  WHERE `id` =  :id";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array('id' => $json->id));
    }

    public function add($json)
    {
        $sql = "INSERT INTO `category`  (name, status) VALUE (:name, :status)";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array(
            ':name' => $json->name,
            ':status' => $json->status));
    }

    public function get($json)
    {
        $sql = "SELECT * FROM `category` WHERE `id` = :id ";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array(':id' => $json->id));
        $arr = [];
        foreach ($res as $row) {
            array_push($arr, $row);
        }
        return json_encode($arr[0]);
    }

    public function update($json)
    {
        $sql = "UPDATE `category` SET 
        `name` = :name , 
        `status` = :status 
        WHERE `id` = :id ";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array(
            ':name' => $json->name,
            ':status' => $json->status,
            ':id' => $json->id));
    }

    public function getCategory($json)
    {
        $sql = "SELECT * FROM `post` WHERE `category_id` = :id";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array(':id' => $json->id));
        $arr = [];
        foreach ($res as $row) {
            array_push($arr, $row);
        }
        return count($arr);
    }
}