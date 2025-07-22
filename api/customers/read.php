<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Customer.php';

$database = new Database();
$db = $database->getConnection();

$customer = new Customer($db);

$stmt = $customer->read();
$num = $stmt->rowCount();

if($num > 0) {
    $customers_arr = array();
    $customers_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $customer_item = array(
            "id" => $id,
            "name" => $name,
            "phone" => $phone,
            "email" => $email,
            "address" => $address,
            "meter_number" => $meter_number,
            "status" => $status,
            "connection_date" => $connection_date,
            "created_at" => $created_at
        );

        array_push($customers_arr["records"], $customer_item);
    }

    http_response_code(200);
    echo json_encode($customers_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No customers found."));
}
?>