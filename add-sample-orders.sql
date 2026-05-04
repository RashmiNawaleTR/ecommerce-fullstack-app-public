-- Add sample orders for testing

-- Order 1: Completed order for customer
INSERT INTO orders (user_id, total_amount, status, shipping_address, created_at, updated_at)
VALUES (1, 114.98, 'DELIVERED', '123 Main St, San Francisco, CA 94102',
        CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '2 days');

-- Get the last order ID
DO $$
DECLARE
    last_order_id BIGINT;
BEGIN
    SELECT MAX(id) INTO last_order_id FROM orders;

    -- Order items for order 1
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES
        (last_order_id, 1, 1, 89.99),  -- Wireless Headphones
        (last_order_id, 2, 1, 24.99);  -- T-Shirt
END $$;

-- Order 2: Shipped order
INSERT INTO orders (user_id, total_amount, status, shipping_address, created_at, updated_at)
VALUES (1, 34.99, 'SHIPPED', '123 Main St, San Francisco, CA 94102',
        CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '1 day');

DO $$
DECLARE
    last_order_id BIGINT;
BEGIN
    SELECT MAX(id) INTO last_order_id FROM orders;

    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES (last_order_id, 3, 1, 34.99);  -- Water Bottle
END $$;

-- Order 3: Processing order
INSERT INTO orders (user_id, total_amount, status, shipping_address, created_at, updated_at)
VALUES (1, 79.98, 'PROCESSING', '123 Main St, San Francisco, CA 94102',
        CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP);

DO $$
DECLARE
    last_order_id BIGINT;
BEGIN
    SELECT MAX(id) INTO last_order_id FROM orders;

    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES
        (last_order_id, 4, 1, 49.99),  -- Laptop Backpack
        (last_order_id, 5, 1, 29.99);  -- Yoga Mat
END $$;

-- Verify orders were created
SELECT
    o.id,
    o.total_amount,
    o.status,
    o.created_at,
    COUNT(oi.id) as item_count
FROM orders o
LEFT JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.user_id = 1
GROUP BY o.id, o.total_amount, o.status, o.created_at
ORDER BY o.created_at DESC;
