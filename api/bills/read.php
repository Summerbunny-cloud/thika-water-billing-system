<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Bill.php';

$database = new Database();
$db = $database->getConnection();

$bill = new Bill($db);

$stmt = $bill->read();
$num = $stmt->rowCount();

if($num > 0) {
    $bills_arr = array();
    $bills_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $bill_item = array(
            "id" => $id,
            "customer_id" => $customer_id,
            "customer_name" => $customer_name,
            "meter_number" => $meter_number,
            "billing_period" => $billing_period,
            "consumption" => $consumption,
            "rate" => $rate,
            "water_charges" => $water_charges,
            "sewerage_charges" => $sewerage_charges,
            "service_charge" => $service_charge,
            "total_amount" => $total_amount,
            "due_date" => $due_date,
            "status" => $status,
            "issue_date" => $issue_date
        );

        array_push($bills_arr["records"], $bill_item);
    }

    http_response_code(200);
    echo json_encode($bills_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No bills found."));
}
?>