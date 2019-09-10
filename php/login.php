<?php  
	
    include "conn.php";
    
    if(isset($_POST['user'])&&isset($_POST['pass'])){
        $user=$_POST['user'];
        $pass=sha1($_POST['pass']);
        $result=mysql_query("select * from loginlist where username='$user' and password='$pass' ");
         if(mysql_fetch_assoc($result)){
            echo true;        
         }
         else{
             echo false;
         }
    }