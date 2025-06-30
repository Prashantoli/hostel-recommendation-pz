#!/bin/bash

# Useful Docker commands for the Hostel Recommendation System

case "$1" in
    "start")
        echo "🚀 Starting all services..."
        docker-compose up -d
        ;;
    "stop")
        echo "🛑 Stopping all services..."
        docker-compose down
        ;;
    "restart")
        echo "🔄 Restarting all services..."
        docker-compose restart
        ;;
    "logs")
        echo "📋 Showing logs..."
        docker-compose logs -f
        ;;
    "build")
        echo "🔨 Rebuilding containers..."
        docker-compose build --no-cache
        ;;
    "clean")
        echo "🧹 Cleaning up containers and volumes..."
        docker-compose down -v
        docker system prune -f
        ;;
    "status")
        echo "📊 Service status:"
        docker-compose ps
        ;;
    "shell")
        echo "🐚 Opening shell in app container..."
        docker-compose exec app sh
        ;;
    "mongo")
        echo "🍃 Opening MongoDB shell..."
        docker-compose exec mongodb mongosh -u admin -p password123 --authenticationDatabase admin
        ;;
    *)
        echo "🏠 Hostel Recommendation System - Docker Commands"
        echo ""
        echo "Usage: $0 {start|stop|restart|logs|build|clean|status|shell|mongo}"
        echo ""
        echo "Commands:"
        echo "  start   - Start all services"
        echo "  stop    - Stop all services"
        echo "  restart - Restart all services"
        echo "  logs    - Show service logs"
        echo "  build   - Rebuild containers"
        echo "  clean   - Clean up containers and volumes"
        echo "  status  - Show service status"
        echo "  shell   - Open shell in app container"
        echo "  mongo   - Open MongoDB shell"
        ;;
esac
