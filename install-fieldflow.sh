#!/bin/bash

# --- FieldFlow SaaS Deployment Script (Debian 12) ---
# This script automates the installation of Node.js, PM2, Nginx, and FieldFlow.

set -e

echo "🚀 Starting FieldFlow Installation on Debian 12..."

# 1. Update System
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# 2. Install Essentials
echo "🛠️ Installing Git, Curl and build essentials..."
sudo apt install -y git curl build-essential

# 3. Install Node.js (LTS v20)
echo "🟢 Installing Node.js v20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Install PM2
echo "🔄 Installing PM2 Process Manager..."
sudo npm install -g pm2

# 5. Application Setup
# Note: This assumes you have already uploaded the files or will clone from a repo.
# If cloning: git clone YOUR_REPO_URL fieldflow && cd fieldflow

echo "📂 Current Directory: $(pwd)"
echo "📥 Installing project dependencies..."
npm install

# 6. Build Application
echo "🏗️ Building Next.js production bundle..."
npm run build

# 7. Start with PM2
echo "📡 Starting application with PM2..."
pm2 start npm --name "fieldflow" -- start
pm2 save
pm2 startup

# 8. Setup Nginx (Optional but Recommended)
echo "🌐 Configuring Nginx Reverse Proxy..."
sudo apt install -y nginx

# Create Nginx Config
# Replace 'your-domain.com' with your actual domain later.
cat <<EOF | sudo tee /etc/nginx/sites-available/fieldflow
server {
    listen 80;
    server_name _; # Adjust this to your domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/fieldflow /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "✅ Installation Complete!"
echo "-------------------------------------------------------"
echo "FieldFlow is now running on http://localhost:3000"
echo "Nginx is proxying traffic from port 80."
echo "-------------------------------------------------------"
echo "⚠️  IMPORTANT: Remember to create your .env.local file with:"
echo "NEXT_PUBLIC_MASTER_SUPABASE_URL=..."
echo "NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY=..."
echo "SUPABASE_SERVICE_ROLE_KEY=..."
echo "-------------------------------------------------------"
