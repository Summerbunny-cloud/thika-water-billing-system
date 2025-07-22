<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Payment.php';

$database = new Database();
$db = $database->getConnection();

$payment = new Payment($db);

$stmt = $payment->read();
$num = $stmt->rowCount();

if($num > 0) {
    $payments_arr = array();
    $payments_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $payment_item = array(
            "id" => $id,
            "customer_id" => $customer_id,
            "customer_name" => $customer_name,
            "bill_id" => $bill_id,
            "amount" => $amount,
            "payment_method" => $payment_method,
            "transaction_ref" => $transaction_ref,
            "payment_date" => $payment_date,
            "status" => $status,
            "phone_number" => $phone_number
        );

        array_push($payments_arr["records"], $payment_item);
    }

    http_response_code(200);
    echo json_encode($payments_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No payments found."));
}
?>