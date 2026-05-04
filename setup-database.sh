#!/bin/bash

# E-Commerce Database Setup Script
# This script creates the database, schema, and sample data

echo "🗄️  Setting up E-Commerce Database..."

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start it first:"
    echo "   macOS: brew services start postgresql@15"
    echo "   Linux: sudo systemctl start postgresql"
    exit 1
fi

# Drop existing database (optional - comment out if you want to keep data)
# psql postgres -c "DROP DATABASE IF EXISTS ecommerce_db;"

# Create database
echo "📦 Creating database..."
psql postgres -c "CREATE DATABASE ecommerce_db;" 2>/dev/null || echo "Database already exists"

# Create schema
echo "📋 Creating tables..."
psql -d ecommerce_db -f backend/src/main/resources/schema.sql

# Insert sample data
echo "📝 Inserting sample data..."
psql -d ecommerce_db -f backend/src/main/resources/init-data.sql

# Verify
echo ""
echo "✅ Database setup complete!"
echo ""
echo "📊 Database Summary:"
psql -d ecommerce_db -c "
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Orders', COUNT(*) FROM orders;
"

echo ""
echo "🔑 Test Credentials:"
echo "   Customer: customer@test.com"
echo "   Admin: admin@test.com"
echo "   Password (both): Test123456789!"
echo ""
echo "🚀 Ready to start the application!"
