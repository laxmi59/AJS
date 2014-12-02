<?php
include ("config.php");
if($_GET['act'] == 'all'){
    $sql = "SELECT `id` , `sku` , `name` , `price` , `mrp` , `description` , `packing` , `image` , `category` , `stock` , `status` FROM `products` ORDER BY id ASC";
    $query = mysql_query($sql);                
    $rows = array();
    while($r = mysql_fetch_assoc($query)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
}

if($_GET['act'] == 'statusUpdate'){
    $sql = "SELECT `id`, `status` FROM `products` where id = ".$_GET['pid'];
    $query = mysql_fetch_array(mysql_query($sql));                
    if($query['status'] == 'Active'){
        $upd = "status = 'Inactive'";
    }else{
        $upd = "status = 'Active'";
    }
    $updSql = "update `products` set ".$upd." where id = ".$_GET['pid'];
    $updquery = mysql_query($updSql);
    if($updquery){
        echo 1;
    }else{
        echo 0;
    }
}

if($_GET['act'] == 'insertProduct'){
    $errorsArr = array();
    if($_REQUEST['productName'] == "undefined")
        $errorsArr[] = "Name Required";    
    
    if($_REQUEST['productPrice'] == "undefined")
        $errorsArr[] = "Price Required"; 
    
    if($errorsArr)
        print_r($errorsArr);
    else
        echo "success";
}
?>
