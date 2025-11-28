# 🚀 Quick Docker Deployment Guide

This is a simplified guide to get DonorSense running with Docker quickly.

## Prerequisites

- Docker installed on your server
- Docker Compose installed
- Git (optional, if cloning from repository)

---

## 🏃 Quick Start (3 Steps)

### Step 1: Generate package-lock.json (if not exists)

```bash
npm install --package-lock-only
```

Or use the setup script:

```bash
chmod +x setup-docker.sh
./setup-docker.sh
```

### Step 2: Build and Start

```bash
# Build the Docker image
docker-compose build

# Start the application
docker-compose up -d

# Check if running
docker ps
```

### Step 3: Access Your Application

Open your browser and go to:
- Local: `http://localhost:3000`
- Server: `http://your-server-ip:3000`

---

## 🔧 Common Issues & Solutions

### Issue 1: `npm ci` Error (package-lock.json missing)

**Error:**
```
npm error The `npm ci` command can only install with an existing package-lock.json
```

**Solution:**
```bash
# Generate package-lock.json
npm install --package-lock-only

# Then rebuild
docker-compose build
```

### Issue 2: Port 3000 Already in Use

**Solution Option A - Change Port:**
Edit `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change 3000 to 3001 or any available port
```

**Solution Option B - Kill Existing Process:**
```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process (replace PID with actual number)
sudo kill -9 PID
```

### Issue 3: Permission Denied

**Solution:**
```bash
# Add your user to docker group
sudo usermod -aG docker $USER

# Log out and log back in, or run:
newgrp docker

# Verify
docker ps
```

### Issue 4: Build Takes Too Long

**This is normal!** First build can take 10-15 minutes. Subsequent builds are faster due to caching.

---

## 📝 Useful Commands

```bash
# View logs
docker-compose logs -f

# Stop application
docker-compose down

# Restart application
docker-compose restart

# Rebuild and restart (after code changes)
docker-compose up -d --build

# Check resource usage
docker stats

# Access container shell
docker exec -it donorsense-app sh

# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Remove all stopped containers
docker-compose down --volumes
```

---

## 🌐 Setting Up with Nginx

### Quick Nginx Setup

1. **Install Nginx:**
```bash
sudo apt update
sudo apt install nginx -y
```

2. **Create Configuration:**
```bash
sudo nano /etc/nginx/sites-available/donorsense
```

3. **Paste This Configuration:**
```nginx
server {
    listen 80;
    server_name your-server-ip;  # Replace with your IP or domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Enable and Restart:**
```bash
sudo ln -s /etc/nginx/sites-available/donorsense /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

5. **Access Application:**
- `http://your-server-ip` (port 80, through Nginx)

---

## 🔐 Production Checklist

Before going live:

- [ ] Set up SSL certificate (Let's Encrypt)
- [ ] Configure firewall (allow ports 80, 443)
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Update environment variables
- [ ] Test all features
- [ ] Set up domain DNS (if using domain)

---

## 📚 Need More Help?

- **Full Deployment Guide**: See `DEPLOYMENT.md` for detailed instructions
- **Troubleshooting**: Check the Troubleshooting section in `DEPLOYMENT.md`
- **Docker Docs**: https://docs.docker.com/
- **Nginx Docs**: https://nginx.org/en/docs/

---

## 🎯 One-Line Deployment

```bash
npm install --package-lock-only && docker-compose up -d --build
```

This generates the lock file and starts everything in one command!

---

## 📊 Monitoring Your App

```bash
# Check if app is healthy
curl http://localhost:3000

# Check container status
docker ps

# View real-time logs
docker-compose logs -f donorsense-app

# Check resource usage
docker stats donorsense-app
```

---

## 🔄 Updating Your App

```bash
# Pull latest changes (if using git)
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Verify it's running
docker ps
```

---

**That's it!** Your DonorSense application should now be running. 🎉

For production deployments with SSL, monitoring, and advanced configuration, refer to the complete `DEPLOYMENT.md` guide.
