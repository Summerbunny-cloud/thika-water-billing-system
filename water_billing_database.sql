-- Water Billing System Database Schema for MySQL/XAMPP
-- Run this in phpMyAdmin or MySQL console

CREATE DATABASE IF NOT EXISTS water_billing_system;
USE water_billing_system;

-- Customers table
CREATE TABLE customers (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    address TEXT NOT NULL,
    meter_number VARCHAR(20) UNIQUE NOT NULL,
    status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
    connection_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Meter readings table
CREATE TABLE meter_readings (
    id VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(20) NOT NULL,
    meter_number VARCHAR(20) NOT NULL,
    previous_reading DECIMAL(10,2) NOT NULL,
    current_reading DECIMAL(10,2) NOT NULL,
    consumption DECIMAL(10,2) AS (current_reading - previous_reading) STORED,
    reading_date DATE NOT NULL,
    status ENUM('Confirmed', 'Pending', 'Anomaly') DEFAULT 'Pending',
    reader VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (meter_number) REFERENCES customers(meter_number)
);

-- Bills table
CREATE TABLE bills (
    id VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(20) NOT NULL,
    meter_number VARCHAR(20) NOT NULL,
    billing_period VARCHAR(20) NOT NULL,
    consumption DECIMAL(10,2) NOT NULL,
    rate DECIMAL(10,2) NOT NULL DEFAULT 45.50,
    water_charges DECIMAL(10,2) AS (consumption * rate) STORED,
    sewerage_charges DECIMAL(10,2) AS (water_charges * 0.5) STORED,
    service_charge DECIMAL(10,2) DEFAULT 150.00,
    total_amount DECIMAL(10,2) AS (water_charges + sewerage_charges + service_charge) STORED,
    due_date DATE NOT NULL,
    status ENUM('Pending', 'Sent', 'Paid', 'Overdue') DEFAULT 'Pending',
    issue_date DATE DEFAULT (CURDATE()),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Payments table
CREATE TABLE payments (
    id VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(20) NOT NULL,
    bill_id VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('M-Pesa', 'Bank Transfer', 'Cash', 'Credit Card') NOT NULL,
    transaction_ref VARCHAR(50) NOT NULL,
    payment_date DATETIME NOT NULL,
    status ENUM('Completed', 'Pending', 'Failed') DEFAULT 'Pending',
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE
);

-- Complaints table
CREATE TABLE complaints (
    id VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(20) NOT NULL,
    category ENUM('Water Quality', 'Billing', 'Service', 'Technical', 'Other') NOT NULL,
    subject VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
    status ENUM('Open', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Open',
    assigned_to VARCHAR(100),
    resolution TEXT,
    submitted_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_date DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO customers (id, name, phone, email, address, meter_number, status, connection_date) VALUES
('W2001', 'John Kamau', '+254712345678', 'john.kamau@email.com', 'Plot 45, Thika Town', 'TW2001', 'Active', '2022-01-15'),
('W2002', 'Mary Wanjiku', '+254723456789', 'mary.wanjiku@email.com', 'House 12B, Landless Estate', 'TW2002', 'Active', '2021-08-22'),
('W2003', 'Peter Mwangi', '+254734567890', 'peter.mwangi@email.com', 'Kenyatta Road, Plot 7', 'TW2003', 'Suspended', '2020-03-10'),
('W2004', 'Grace Njeri', '+254745678901', 'grace.njeri@email.com', 'Blue Post Area, House 24', 'TW2004', 'Active', '2023-02-18'),
('W2005', 'James Kariuki', '+254756789012', 'james.kariuki@email.com', 'Makongeni Estate, Block C', 'TW2005', 'Inactive', '2019-11-05');

INSERT INTO meter_readings (id, customer_id, meter_number, previous_reading, current_reading, reading_date, status, reader) VALUES
('R001', 'W2001', 'TW2001', 140.2, 145.5, '2024-07-28', 'Confirmed', 'Peter Mbugua'),
('R002', 'W2002', 'TW2002', 85.1, 89.2, '2024-07-28', 'Pending', 'Grace Muthoni'),
('R003', 'W2003', 'TW2003', 198.8, 203.1, '2024-07-27', 'Anomaly', 'John Kiprotich'),
('R004', 'W2004', 'TW2004', 52.4, 56.8, '2024-07-28', 'Confirmed', 'Peter Mbugua'),
('R005', 'W2005', 'TW2005', 175.2, 178.9, '2024-07-26', 'Confirmed', 'Grace Muthoni');

INSERT INTO bills (id, customer_id, meter_number, billing_period, consumption, due_date, status) VALUES
('B2024070001', 'W2001', 'TW2001', 'July 2024', 5.3, '2024-08-15', 'Sent'),
('B2024070002', 'W2002', 'TW2002', 'July 2024', 4.1, '2024-08-15', 'Paid'),
('B2024070003', 'W2003', 'TW2003', 'July 2024', 4.3, '2024-08-15', 'Overdue'),
('B2024070004', 'W2004', 'TW2004', 'July 2024', 4.4, '2024-08-15', 'Pending'),
('B2024070005', 'W2005', 'TW2005', 'July 2024', 3.7, '2024-08-15', 'Sent');

INSERT INTO payments (id, customer_id, bill_id, amount, payment_method, transaction_ref, payment_date, status, phone_number) VALUES
('P2024070001', 'W2001', 'B2024070001', 511.73, 'M-Pesa', 'PH67KL89M', '2024-07-28 14:30:00', 'Completed', '+254712345678'),
('P2024070002', 'W2002', 'B2024070002', 429.83, 'Bank Transfer', 'BT789456123', '2024-07-27 10:15:00', 'Completed', '+254723456789'),
('P2024070003', 'W2004', 'B2024070004', 450.30, 'Cash', 'CSH2024001', '2024-07-26 09:45:00', 'Completed', '+254745678901'),
('P2024070004', 'W2001', 'B2024060001', 487.20, 'M-Pesa', 'PH23FG45H', '2024-07-25 16:20:00', 'Completed', '+254712345678'),
('P2024070005', 'W2003', 'B2024070003', 200.00, 'M-Pesa', 'PH89JK12L', '2024-07-24 11:30:00', 'Pending', '+254734567890');