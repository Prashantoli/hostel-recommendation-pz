#!/bin/bash

# Docker setup script for Hostel Recommendation System

echo "🏠 Setting up Hostel Recommendation System with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Installing Docker..."
    
    # Update packages
    sudo apt update
    
    # Install Docker
    sudo apt install docker.io -y
    
    # Start and enable Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Add user to docker group
    sudo usermod -aG docker $USER
    
    echo "✅ Docker installed successfully!"
    echo "⚠️  Please log out and log back in for Docker group changes to take effect."
    echo "Then run this script again."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Installing..."
    
    # Install Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    
    echo "✅ Docker Compose installed successfully!"
fi

# Create necessary directories
echo "📁 Creating project directories..."
mkdir -p client/styles client/scripts server/routes server/models server/config database scripts

# Set permissions
chmod +x scripts/docker-setup.sh

# Build and start containers
echo "🔨 Building Docker containers..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

# Test the application
echo "🧪 Testing the application..."
sleep 5

if curl -f http://localhost:3000/api/hostels > /dev/null 2>&1; then
    echo "✅ Application is running successfully!"
    echo ""
    echo "🌐 Access your application at:"
    echo "   Main App: http://localhost:3000"
    echo "   Database Admin: http://localhost:8081 (admin/admin123)"
    echo ""
    echo "📋 Default login credentials:"
    echo "   Admin: admin@hostel.com / admin123"
    echo "   User: user@example.com / user123"
    echo ""
    echo "🐳 Docker commands:"
    echo "   View logs: docker-compose logs -f"
    echo "   Stop: docker-compose down"
    echo "   Restart: docker-compose restart"
else
    echo "❌ Application failed to start. Check logs:"
    echo "docker-compose logs"
fi
