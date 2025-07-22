<?php
class Payment {
    private $conn;
    private $table_name = "payments";

    public $id;
    public $customer_id;
    public $bill_id;
    public $amount;
    public $payment_method;
    public $transaction_ref;
    public $payment_date;
    public $status;
    public $phone_number;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Read all payments with customer information
    function read() {
        $query = "SELECT p.*, c.name as customer_name 
                  FROM " . $this->table_name . " p
                  LEFT JOIN customers c ON p.customer_id = c.id
                  ORDER BY p.payment_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Read single payment
    function readOne() {
        $query = "SELECT p.*, c.name as customer_name 
                  FROM " . $this->table_name . " p
                  LEFT JOIN customers c ON p.customer_id = c.id
                  WHERE p.id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->customer_id = $row['customer_id'];
            $this->bill_id = $row['bill_id'];
            $this->amount = $row['amount'];
            $this->payment_method = $row['payment_method'];
            $this->transaction_ref = $row['transaction_ref'];
            $this->payment_date = $row['payment_date'];
            $this->status = $row['status'];
            $this->phone_number = $row['phone_number'];
            return true;
        }
        return false;
    }

    // Create payment
    function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET id=:id, customer_id=:customer_id, bill_id=:bill_id, 
                      amount=:amount, payment_method=:payment_method, 
                      transaction_ref=:transaction_ref, payment_date=:payment_date, 
                      status=:status, phone_number=:phone_number";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->customer_id = htmlspecialchars(strip_tags($this->customer_id));
        $this->bill_id = htmlspecialchars(strip_tags($this->bill_id));
        $this->amount = htmlspecialchars(strip_tags($this->amount));
        $this->payment_method = htmlspecialchars(strip_tags($this->payment_method));
        $this->transaction_ref = htmlspecialchars(strip_tags($this->transaction_ref));
        $this->payment_date = htmlspecialchars(strip_tags($this->payment_date));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->phone_number = htmlspecialchars(strip_tags($this->phone_number));

        // Bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":customer_id", $this->customer_id);
        $stmt->bindParam(":bill_id", $this->bill_id);
        $stmt->bindParam(":amount", $this->amount);
        $stmt->bindParam(":payment_method", $this->payment_method);
        $stmt->bindParam(":transaction_ref", $this->transaction_ref);
        $stmt->bindParam(":payment_date", $this->payment_date);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":phone_number", $this->phone_number);

        if($stmt->execute()) {
            // Update bill status to paid if payment is completed
            if($this->status === 'Completed') {
                $bill_query = "UPDATE bills SET status = 'Paid' WHERE id = ?";
                $bill_stmt = $this->conn->prepare($bill_query);
                $bill_stmt->bindParam(1, $this->bill_id);
                $bill_stmt->execute();
            }
            return true;
        }
        return false;
    }

    // Update payment
    function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET customer_id=:customer_id, bill_id=:bill_id, 
                      amount=:amount, payment_method=:payment_method, 
                      transaction_ref=:transaction_ref, payment_date=:payment_date, 
                      status=:status, phone_number=:phone_number 
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Sanitize and bind values
        $this->customer_id = htmlspecialchars(strip_tags($this->customer_id));
        $this->bill_id = htmlspecialchars(strip_tags($this->bill_id));
        $this->amount = htmlspecialchars(strip_tags($this->amount));
        $this->payment_method = htmlspecialchars(strip_tags($this->payment_method));
        $this->transaction_ref = htmlspecialchars(strip_tags($this->transaction_ref));
        $this->payment_date = htmlspecialchars(strip_tags($this->payment_date));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->phone_number = htmlspecialchars(strip_tags($this->phone_number));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(":customer_id", $this->customer_id);
        $stmt->bindParam(":bill_id", $this->bill_id);
        $stmt->bindParam(":amount", $this->amount);
        $stmt->bindParam(":payment_method", $this->payment_method);
        $stmt->bindParam(":transaction_ref", $this->transaction_ref);
        $stmt->bindParam(":payment_date", $this->payment_date);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":phone_number", $this->phone_number);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Delete payment
    function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Get customer payments
    function getCustomerPayments($customer_id) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE customer_id = ? 
                  ORDER BY payment_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $customer_id);
        $stmt->execute();
        return $stmt;
    }
}
?>