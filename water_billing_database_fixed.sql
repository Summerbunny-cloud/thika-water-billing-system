-- Updated Database Schema to match Frontend exactly

DROP DATABASE IF EXISTS water_billing_system;
CREATE DATABASE water_billing_system;
USE water_billing_system;

-- Customers table (matching frontend camelCase via alias)
CREATE TABLE customers (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    address TEXT NOT NULL,
    meterNumber VARCHAR(20) UNIQUE NOT NULL,
    status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
    connectionDate DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Meter readings table (with location field)
CREATE TABLE meter_readings (
    id VARCHAR(20) PRIMARY KEY,
    customerId VARCHAR(20) NOT NULL,
    customerName VARCHAR(100),
    meterNumber VARCHAR(20) NOT NULL,
    previousReading DECIMAL(10,2) NOT NULL,
    currentReading DECIMAL(10,2) NOT NULL,
    consumption DECIMAL(10,2) AS (currentReading - previousReading) STORED,
    readingDate DATE NOT NULL,
    status ENUM('Confirmed', 'Pending', 'Anomaly') DEFAULT 'Pending',
    reader VARCHAR(100),
    location VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE
);

-- Bills table (camelCase fields)
CREATE TABLE bills (
    id VARCHAR(20) PRIMARY KEY,
    customerId VARCHAR(20) NOT NULL,
    customerName VARCHAR(100),
    meterNumber VARCHAR(20) NOT NULL,
    billingPeriod VARCHAR(20) NOT NULL,
    consumption DECIMAL(10,2) NOT NULL,
    rate DECIMAL(10,2) NOT NULL DEFAULT 45.50,
    waterCharges DECIMAL(10,2) AS (consumption * rate) STORED,
    sewerageCharges DECIMAL(10,2) AS (waterCharges * 0.5) STORED,
    serviceCharge DECIMAL(10,2) DEFAULT 150.00,
    totalAmount DECIMAL(10,2) AS (waterCharges + sewerageCharges + serviceCharge) STORED,
    dueDate DATE NOT NULL,
    status ENUM('Pending', 'Sent', 'Paid', 'Overdue') DEFAULT 'Pending',
    issueDate DATE DEFAULT (CURDATE()),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE
);

-- Payments table (camelCase fields)
CREATE TABLE payments (
    id VARCHAR(20) PRIMARY KEY,
    customerId VARCHAR(20) NOT NULL,
    customerName VARCHAR(100),
    billId VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    paymentMethod ENUM('M-Pesa', 'Bank Transfer', 'Cash', 'Credit Card') NOT NULL,
    transactionRef VARCHAR(50) NOT NULL,
    paymentDate DATETIME NOT NULL,
    status ENUM('Completed', 'Pending', 'Failed') DEFAULT 'Pending',
    phoneNumber VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (billId) REFERENCES bills(id) ON DELETE CASCADE
);

-- Create view for customers with calculated fields
CREATE VIEW customers_with_totals AS
SELECT 
    c.*,
    CONCAT(COALESCE(mr.currentReading, 0), ' m³') as lastReading,
    CONCAT('KSh ', COALESCE(
        (SELECT SUM(totalAmount) 
         FROM bills b 
         WHERE b.customerId = c.id AND b.status != 'Paid'), 0)
    ) as outstanding
FROM customers c
LEFT JOIN meter_readings mr ON c.id = mr.customerId 
    AND mr.readingDate = (
        SELECT MAX(readingDate) 
        FROM meter_readings mr2 
        WHERE mr2.customerId = c.id
    );

-- Insert sample data exactly matching frontend
INSERT INTO customers (id, name, phone, email, address, meterNumber, status, connectionDate) VALUES
('W2001', 'John Kamau', '+254 712 345 678', 'john.kamau@email.com', 'Plot 45, Thika Town', 'TW2001', 'Active', '2022-01-15'),
('W2002', 'Mary Wanjiku', '+254 723 456 789', 'mary.wanjiku@email.com', 'House 12B, Landless Estate', 'TW2002', 'Active', '2021-08-22'),
('W2003', 'Peter Mwangi', '+254 734 567 890', 'peter.mwangi@email.com', 'Kenyatta Road, Plot 7', 'TW2003', 'Suspended', '2020-03-10'),
('W2004', 'Grace Njeri', '+254 745 678 901', 'grace.njeri@email.com', 'Blue Post Area, House 24', 'TW2004', 'Active', '2023-02-18'),
('W2005', 'James Kariuki', '+254 756 789 012', 'james.kariuki@email.com', 'Makongeni Estate, Block C', 'TW2005', 'Inactive', '2019-11-05');

INSERT INTO meter_readings (id, customerId, customerName, meterNumber, previousReading, currentReading, readingDate, status, reader, location) VALUES
('R001', 'W2001', 'John Kamau', 'TW2001', 140.2, 145.5, '2024-07-28', 'Confirmed', 'Peter Mbugua', 'Thika Town'),
('R002', 'W2002', 'Mary Wanjiku', 'TW2002', 85.1, 89.2, '2024-07-28', 'Pending', 'Grace Muthoni', 'Landless Estate'),
('R003', 'W2003', 'Peter Mwangi', 'TW2003', 198.8, 203.1, '2024-07-27', 'Anomaly', 'John Kiprotich', 'Kenyatta Road'),
('R004', 'W2004', 'Grace Njeri', 'TW2004', 52.4, 56.8, '2024-07-28', 'Confirmed', 'Peter Mbugua', 'Blue Post Area'),
('R005', 'W2005', 'James Kariuki', 'TW2005', 175.2, 178.9, '2024-07-26', 'Confirmed', 'Grace Muthoni', 'Makongeni Estate');

INSERT INTO bills (id, customerId, customerName, meterNumber, billingPeriod, consumption, dueDate, status, issueDate) VALUES
('B2024070001', 'W2001', 'John Kamau', 'TW2001', 'July 2024', 5.3, '2024-08-15', 'Sent', '2024-07-30'),
('B2024070002', 'W2002', 'Mary Wanjiku', 'TW2002', 'July 2024', 4.1, '2024-08-15', 'Paid', '2024-07-30'),
('B2024070003', 'W2003', 'Peter Mwangi', 'TW2003', 'July 2024', 4.3, '2024-08-15', 'Overdue', '2024-07-30'),
('B2024070004', 'W2004', 'Grace Njeri', 'TW2004', 'July 2024', 4.4, '2024-08-15', 'Pending', '2024-07-30'),
('B2024070005', 'W2005', 'James Kariuki', 'TW2005', 'July 2024', 3.7, '2024-08-15', 'Sent', '2024-07-30');

INSERT INTO payments (id, customerId, customerName, billId, amount, paymentMethod, transactionRef, paymentDate, status, phoneNumber) VALUES
('P2024070001', 'W2001', 'John Kamau', 'B2024070001', 511.73, 'M-Pesa', 'PH67KL89M', '2024-07-28 14:30:00', 'Completed', '+254712345678'),
('P2024070002', 'W2002', 'Mary Wanjiku', 'B2024070002', 429.83, 'Bank Transfer', 'BT789456123', '2024-07-27 10:15:00', 'Completed', '+254723456789'),
('P2024070003', 'W2004', 'Grace Njeri', 'B2024070004', 450.30, 'Cash', 'CSH2024001', '2024-07-26 09:45:00', 'Completed', '+254745678901'),
('P2024070004', 'W2001', 'John Kamau', 'B2024060001', 487.20, 'M-Pesa', 'PH23FG45H', '2024-07-25 16:20:00', 'Completed', '+254712345678'),
('P2024070005', 'W2003', 'Peter Mwangi', 'B2024070003', 200.00, 'M-Pesa', 'PH89JK12L', '2024-07-24 11:30:00', 'Pending', '+254734567890');