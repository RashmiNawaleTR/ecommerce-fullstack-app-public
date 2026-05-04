-- Sample data for E-Commerce Application
-- Run this after the first application startup (when tables are created)

-- Insert Users
-- Password for all users: Test123456789!
-- (BCrypt hash with strength 12)
INSERT INTO users (email, password_hash, name, role, enabled, created_at, updated_at) VALUES
('customer@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GIBng6qGw8x6', 'Test Customer', 'CUSTOMER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GIBng6qGw8x6', 'Admin User', 'ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert 5 Sample Products
INSERT INTO products (name, description, price, stock, category, image_url, created_at, updated_at) VALUES
('Wireless Bluetooth Headphones', 'Premium noise-cancelling headphones with 30-hour battery life. Crystal clear sound quality with deep bass and comfortable over-ear design.', 89.99, 45, 'Electronics', '/assets/products/headphones.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Organic Cotton T-Shirt', 'Soft, breathable 100% organic cotton t-shirt. Available in multiple colors. Perfect for everyday wear with a classic fit.', 24.99, 120, 'Clothing', '/assets/products/tshirt.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Stainless Steel Water Bottle', 'Double-wall insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof design with 32oz capacity.', 34.99, 78, 'Home & Kitchen', '/assets/products/bottle.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Laptop Backpack', 'Durable laptop backpack with padded compartment for 15.6" laptops. Multiple pockets for organization, USB charging port, and water-resistant material.', 49.99, 32, 'Accessories', '/assets/products/backpack.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Yoga Mat with Carrying Strap', 'Extra thick 6mm yoga mat with non-slip surface. Eco-friendly TPE material, perfect for yoga, pilates, and floor exercises. Includes carrying strap.', 29.99, 95, 'Sports & Fitness', '/assets/products/yogamat.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Verify data
SELECT 'Users created: ' || COUNT(*) as status FROM users;
SELECT 'Products created: ' || COUNT(*) as status FROM products;
