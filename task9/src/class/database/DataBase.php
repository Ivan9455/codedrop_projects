<?php

class DataBase
{
    private $host = "localhost";
    private $name = "root";
    private $password = "enot1147";
    private $database = 'data';
    private $connect;

    public function __construct()
    {
        try {
            $this->connect = new PDO(
                "mysql:host=".$this->host.
                ";dbname=".$this->database,
                $this->name,
                $this->password);
        } catch (PDOException $e) {
            file_put_contents(
                'PDOErrors.txt',
                $e->getMessage(),
                FILE_APPEND);
        }
    }

    public function getConnect()
    {
        return $this->connect;
    }

    public function __destruct()
    {
        $this->connect = null;
    }
}