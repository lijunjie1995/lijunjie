<?php
header('content-type:text/html;charset=utf-8');
// var_dump(2);
if(isset($_GET['value'])){
    $val=$_GET['value'];
    $result=file_get_contents("https://www.meilele.com/suggestion/?q=$val");
    echo $result;
}