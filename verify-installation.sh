#!/bin/bash

# Gypsy Service Dog Training App - Installation Verification Script

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Verifying Gypsy Training App Installation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ERRORS=0

# Check Node.js
echo -n "Checking Node.js installation... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Found $NODE_VERSION"
else
    echo "❌ Node.js not found!"
    ERRORS=$((ERRORS + 1))
fi

# Check npm
echo -n "Checking npm installation... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ Found npm $NPM_VERSION"
else
    echo "❌ npm not found!"
    ERRORS=$((ERRORS + 1))
fi

# Check directory
echo -n "Checking application directory... "
if [ -f "server.js" ]; then
    echo "✅ Found server.js"
else
    echo "❌ server.js not found! Are you in the correct directory?"
    ERRORS=$((ERRORS + 1))
fi

# Check package.json
echo -n "Checking package.json... "
if [ -f "package.json" ]; then
    echo "✅ Found package.json"
else
    echo "❌ package.json not found!"
    ERRORS=$((ERRORS + 1))
fi

# Check node_modules
echo -n "Checking dependencies... "
if [ -d "node_modules" ]; then
    echo "✅ Dependencies installed"
else
    echo "⚠️  Dependencies not installed. Run: npm install"
    ERRORS=$((ERRORS + 1))
fi

# Check data directory
echo -n "Checking data directory... "
if [ -d "data" ]; then
    echo "✅ Data directory exists"
else
    echo "⚠️  Data directory missing (will be created on first run)"
fi

# Check data file
echo -n "Checking data file... "
if [ -f "data/training-data.json" ]; then
    echo "✅ Data file exists"
else
    echo "⚠️  Data file missing (will be created on first run)"
fi

# Check views directory
echo -n "Checking views... "
if [ -d "views" ]; then
    echo "✅ Views directory exists"
else
    echo "❌ Views directory not found!"
    ERRORS=$((ERRORS + 1))
fi

# Check public directory
echo -n "Checking public assets... "
if [ -d "public" ]; then
    echo "✅ Public directory exists"
else
    echo "❌ Public directory not found!"
    ERRORS=$((ERRORS + 1))
fi

# Check CSS
echo -n "Checking CSS file... "
if [ -f "public/css/style.css" ]; then
    echo "✅ Stylesheet found"
else
    echo "❌ Stylesheet not found!"
    ERRORS=$((ERRORS + 1))
fi

# Check JavaScript files
echo -n "Checking JavaScript files... "
JS_COUNT=$(find public/js -name "*.js" 2>/dev/null | wc -l)
if [ "$JS_COUNT" -ge 4 ]; then
    echo "✅ Found $JS_COUNT JS files"
else
    echo "❌ Missing JavaScript files!"
    ERRORS=$((ERRORS + 1))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ]; then
    echo "✅ All checks passed!"
    echo ""
    echo "🚀 Ready to start the application:"
    echo "   npm start"
    echo ""
    echo "Then open: http://localhost:3500"
else
    echo "❌ Found $ERRORS error(s)"
    echo ""
    echo "Try running: npm install"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
