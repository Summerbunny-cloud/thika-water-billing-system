<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Customer.php';

$database = new Database();
$db = $database->getConnection();

$customer = new Customer($db);

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->id) &&
    !empty($data->name) &&
    !empty($data->phone) &&
    !empty($data->address) &&
    !empty($data->meter_number) &&
    !empty($data->connection_date)
) {
    $customer->id = $data->id;
    $customer->name = $data->name;
    $customer->phone = $data->phone;
    $customer->email = $data->email ?? '';
    $customer->address = $data->address;
    $customer->meter_number = $data->meter_number;
    $customer->status = $data->status ?? 'Active';
    $customer->connection_date = $data->connection_date;

    if($customer->create()) {
        http_response_code(201);
        echo json_encode(array("message" => "Customer was created."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create customer."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create customer. Data is incomplete."));
}
?>