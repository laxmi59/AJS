<?php
include ("config.php");
if($_GET['rec'] == 'all'){
    $sql = "SELECT `id` , `sku` , `name` , `price` , `mrp` , `description` , `packing` , `image` , `category` , `stock` , `status` FROM `products` ORDER BY id ASC";
    $query = mysql_query($sql);                
    $rows = array();
    while($r = mysql_fetch_assoc($query)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
}
?>
