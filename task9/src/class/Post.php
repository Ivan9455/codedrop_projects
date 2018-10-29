<?php

class Post
{
    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    public function add($json)
    {
        $sql = "INSERT INTO `post`  (user_id, content, status, created_at, category_id) 
                VALUE (:user_id, :content, :status, :created_at, :category_id)";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array(
            ':user_id' => $json->user_id,
            ':content' => $json->content,
            ':status' => $json->status,
            ':created_at' => $json->created_at,
            ':category_id' => $json->category_id));
    }

    public function getS()
    {
        $sql = "SELECT * FROM `post` ";
        $arr = [];
        foreach ($this->db->getConnect()->query($sql) as $row) {
            array_push($arr, $row);
        }
        return $arr;
    }

    public function update($json)
    {
        $sql = "UPDATE `post` SET 
        `user_id` = :user_id , 
        `category_id` = :category_id ,
        `status` = :status ,
        `content` = :content ,
        `updated_at` = :updated_at 
        WHERE `id` = :id ";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array(
            ':user_id' => $json->user_id,
            ':category_id' => $json->category_id,
            ':status' => $json->status,
            ':updated_at' => $json->updated_at,
            ':content' => $json->content,
            ':id' => $json->id));
    }

    public function remove($json)
    {
        $sql = "DELETE FROM `post`  WHERE `id` =  :id";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array('id' => $json->id));
    }

    public function get($json)
    {
        $sql = "SELECT * FROM `post` WHERE `id` = :id ";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array(':id' => $json->id));
        $arr = [];
        foreach ($res as $row) {
            array_push($arr, $row);
        }
        return json_encode($arr[0]);
    }

}