#!/bin/bash

# Quick Setup Script for DonorSense Docker Deployment
# This script helps generate package-lock.json and build Docker image

set -e

echo "================================="
echo "DonorSense Docker Setup"
echo "================================="
echo ""

# Check if package-lock.json exists
if [ ! -f "package-lock.json" ]; then
    echo "⚠️  package-lock.json not found"
    echo "📦 Generating package-lock.json..."
    
    # Generate package-lock.json
    npm install --package-lock-only
    
    echo "✅ package-lock.json generated"
else
    echo "✅ package-lock.json already exists"
fi

echo ""
echo "🔨 Building Docker image..."
echo "This may take 5-10 minutes..."
echo ""

# Build Docker image
docker-compose build

echo ""
echo "================================="
echo "✅ Build Complete!"
echo "================================="
echo ""
echo "Next steps:"
echo "1. Start the application:"
echo "   docker-compose up -d"
echo ""
echo "2. Check status:"
echo "   docker ps"
echo ""
echo "3. View logs:"
echo "   docker-compose logs -f"
echo ""
echo "4. Access application:"
echo "   http://localhost:3000"
echo ""
echo "================================="
