# 🐳 Docker Setup for Hostel Recommendation System

This guide will help you run the entire Hostel Recommendation System using Docker Compose with a single command.

## 🚀 Quick Start

### 1. Clone and Navigate
\`\`\`bash
git clone <your-repo-url>
cd hostel-recommendation-system
\`\`\`

### 2. Run the Setup Script
\`\`\`bash
chmod +x scripts/docker-setup.sh
./scripts/docker-setup.sh
\`\`\`

### 3. Access Your Application
- **Main Application**: http://localhost:3000
- **Database Admin UI**: http://localhost:8081 (admin/admin123)

## 📋 What's Included

The Docker Compose setup includes:

- **Node.js Application** (Port 3000)
- **MongoDB Database** (Port 27017)
- **Mongo Express** - Database Admin UI (Port 8081)
- **Automatic Database Seeding** with sample data
- **Volume Persistence** for database data
- **Health Checks** for all services

## 🛠️ Manual Setup (Alternative)

If you prefer manual setup:

### 1. Install Docker & Docker Compose
\`\`\`bash
# Install Docker
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Log out and log back in for group changes
\`\`\`

### 2. Start Services
\`\`\`bash
# Build and start all services
docker-compose up -d

# Check status
docker-compose ps
\`\`\`

## 🎮 Docker Commands

Use the helper script for common operations:

\`\`\`bash
# Make script executable
chmod +x scripts/docker-commands.sh

# Start services
./scripts/docker-commands.sh start

# Stop services
./scripts/docker-commands.sh stop

# View logs
./scripts/docker-commands.sh logs

# Check status
./scripts/docker-commands.sh status

# Clean up everything
./scripts/docker-commands.sh clean
\`\`\`

## 🔧 Configuration

### Environment Variables
The Docker setup uses environment variables defined in \`docker-compose.yml\`. To customize:

1. Copy \`.env.docker\` to \`.env\`
2. Modify values as needed
3. Restart services: \`docker-compose restart\`

### Database Credentials
- **MongoDB Admin**: admin / password123
- **Mongo Express**: admin / admin123

### Application Credentials
- **Admin User**: admin@hostel.com / admin123
- **Regular User**: user@example.com / user123

## 📊 Service Details

### Application Container
- **Image**: Custom Node.js image
- **Port**: 3000
- **Health Check**: Enabled
- **Auto-restart**: Yes

### MongoDB Container
- **Image**: mongo:7.0
- **Port**: 27017
- **Data Persistence**: Yes (mongodb_data volume)
- **Authentication**: Enabled

### Mongo Express Container
- **Image**: mongo-express:latest
- **Port**: 8081
- **Purpose**: Database administration UI

## 🔍 Troubleshooting

### Check Service Status
\`\`\`bash
docker-compose ps
\`\`\`

### View Logs
\`\`\`bash
# All services
docker-compose logs

# Specific service
docker-compose logs app
docker-compose logs mongodb
\`\`\`

### Restart Services
\`\`\`bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart app
\`\`\`

### Access Container Shell
\`\`\`bash
# App container
docker-compose exec app sh

# MongoDB shell
docker-compose exec mongodb mongosh -u admin -p password123 --authenticationDatabase admin
\`\`\`

### Clean Up and Rebuild
\`\`\`bash
# Stop and remove containers
docker-compose down

# Remove volumes (⚠️ This will delete database data)
docker-compose down -v

# Rebuild containers
docker-compose build --no-cache
docker-compose up -d
\`\`\`

## 🌐 Production Deployment

For production deployment:

1. **Update Environment Variables**:
   - Set strong passwords
   - Configure OAuth credentials
   - Set NODE_ENV=production

2. **Use Docker Secrets** (for sensitive data):
   \`\`\`yaml
   secrets:
     mongodb_password:
       file: ./secrets/mongodb_password.txt
   \`\`\`

3. **Add Reverse Proxy** (Nginx/Traefik):
   - SSL termination
   - Load balancing
   - Domain routing

4. **Enable Monitoring**:
   - Add health check endpoints
   - Configure logging
   - Set up alerts

## 📈 Scaling

To scale the application:

\`\`\`bash
# Scale app containers
docker-compose up -d --scale app=3

# Use load balancer
# Add nginx service to docker-compose.yml
\`\`\`

## 🔒 Security Notes

- Change default passwords in production
- Use Docker secrets for sensitive data
- Enable firewall rules
- Regular security updates
- Monitor container logs

## 📞 Support

If you encounter issues:

1. Check the logs: \`docker-compose logs\`
2. Verify all services are running: \`docker-compose ps\`
3. Ensure ports are not in use: \`netstat -tlnp | grep :3000\`
4. Try rebuilding: \`docker-compose build --no-cache\`

## 🎉 Success!

Once everything is running, you should see:
- ✅ Application at http://localhost:3000
- ✅ Database admin at http://localhost:8081
- ✅ All services healthy in \`docker-compose ps\`

Happy coding! 🚀
