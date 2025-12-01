#!/bin/bash

# ===========================================
# Script de Deploy - Agendamento Policial
# Para VPS Ubuntu/Debian com Nginx
# ===========================================

set -e

APP_NAME="agendamento-policial"
APP_DIR="/var/www/$APP_NAME"
REPO_URL="https://github.com/mantertius/agendamento-policial.git"  # Altere se necessário

echo "🚀 Iniciando deploy do $APP_NAME..."

# 1. Atualizar sistema
echo "📦 Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

# 2. Instalar Node.js 20.x
echo "📦 Instalando Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi
node -v
npm -v

# 3. Instalar dependências para better-sqlite3
echo "📦 Instalando dependências de compilação..."
sudo apt install -y build-essential python3

# 4. Instalar Nginx
echo "📦 Instalando Nginx..."
sudo apt install -y nginx

# 5. Instalar PM2 (gerenciador de processos)
echo "📦 Instalando PM2..."
sudo npm install -g pm2

# 6. Criar diretório da aplicação
echo "📁 Configurando diretório..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# 7. Clonar/Atualizar repositório
if [ -d "$APP_DIR/.git" ]; then
    echo "📥 Atualizando código..."
    cd $APP_DIR
    git pull origin master
else
    echo "📥 Clonando repositório..."
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
fi

# 8. Instalar dependências do projeto
echo "📦 Instalando dependências do projeto..."
npm ci --production=false

# 9. Build da aplicação
echo "🔨 Fazendo build..."
npm run build

# 10. Configurar Nginx
echo "🌐 Configurando Nginx..."
sudo cp nginx.conf /etc/nginx/sites-available/$APP_NAME
sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# 11. Configurar PM2
echo "⚙️ Configurando PM2..."
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start npm --name "$APP_NAME" -- start
pm2 save
pm2 startup | tail -1 | sudo bash

echo ""
echo "✅ Deploy concluído!"
echo "📍 Aplicação rodando em: http://$(curl -s ifconfig.me)"
echo ""
echo "Comandos úteis:"
echo "  pm2 status          - Ver status da aplicação"
echo "  pm2 logs            - Ver logs"
echo "  pm2 restart $APP_NAME - Reiniciar aplicação"
