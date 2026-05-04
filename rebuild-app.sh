#!/bin/bash

echo "======================================================================"
echo "E-COMMERCE APP - CLEAN REBUILD"
echo "======================================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Stop running servers
echo -e "${YELLOW}Stopping running servers...${NC}"
pkill -f "spring-boot:run" 2>/dev/null
pkill -f "ng serve" 2>/dev/null
sleep 2
echo -e "${GREEN}✓ Servers stopped${NC}"
echo ""

# Backend rebuild
echo -e "${YELLOW}Rebuilding Backend...${NC}"
cd backend

echo "  - Cleaning previous build..."
mvn clean -q

echo "  - Installing dependencies..."
mvn install -q -DskipTests

echo "  - Building JAR..."
mvn package -q -DskipTests

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend built successfully${NC}"
else
    echo -e "${RED}✗ Backend build failed${NC}"
    exit 1
fi
cd ..
echo ""

# Frontend rebuild
echo -e "${YELLOW}Rebuilding Frontend...${NC}"
cd frontend

echo "  - Removing old node_modules..."
rm -rf node_modules package-lock.json

echo "  - Installing dependencies..."
npm install --silent

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}✗ Frontend npm install failed${NC}"
    exit 1
fi
cd ..
echo ""

# Database check
echo -e "${YELLOW}Checking Database...${NC}"
if psql -lqt | cut -d \| -f 1 | grep -qw ecommerce_db; then
    echo -e "${GREEN}✓ Database 'ecommerce_db' exists${NC}"

    # Check if tables exist
    TABLE_COUNT=$(psql -d ecommerce_db -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
    echo "  - Found $TABLE_COUNT tables"

    # Check users
    USER_COUNT=$(psql -d ecommerce_db -t -c "SELECT COUNT(*) FROM users;" 2>/dev/null || echo "0")
    echo "  - Found $USER_COUNT users"

    # Check products
    PRODUCT_COUNT=$(psql -d ecommerce_db -t -c "SELECT COUNT(*) FROM products;" 2>/dev/null || echo "0")
    echo "  - Found $PRODUCT_COUNT products"

else
    echo -e "${RED}✗ Database 'ecommerce_db' not found${NC}"
    echo "  Run: ./setup-database.sh"
    exit 1
fi
echo ""

echo "======================================================================"
echo -e "${GREEN}✓ REBUILD COMPLETE${NC}"
echo "======================================================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Start Backend (Terminal 1):"
echo "   cd backend && mvn spring-boot:run"
echo ""
echo "2. Start Frontend (Terminal 2):"
echo "   cd frontend && npm start"
echo ""
echo "3. Login with:"
echo "   Email: customer@test.com"
echo "   Password: Test123456789!"
echo ""
echo "4. Test by adding products to cart"
echo ""
