#!/bin/bash

# Gypsy Service Dog Training App Startup Script

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🐕 Gypsy Service Dog Training App 🐕"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Starting server..."
echo ""

cd "$(dirname "$0")"
npm start
