<?php

class DataBase
{
    private $host = "localhost";
    private $name = "w90831a3_i";
    private $password = "PTUP*vI2";
    private $database = "w90831a3_i";
    private $connect;

    public function __construct()
    {
        $this->connect = mysqli_connect(
            $this->host,
            $this->name,
            $this->password,
            $this->database);
    }

    public function getConnect()
    {
        return $this->connect;
    }

    public function __destruct()
    {
        mysqli_close($this->connect);
    }
}