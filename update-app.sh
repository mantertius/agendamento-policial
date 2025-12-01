#!/bin/bash

# ===========================================
# Script de Update - Agendamento Policial
# Atualiza código do Git, faz build e reinicia
# ===========================================

set -e

APP_NAME="agendamento-policial"
APP_DIR="/root/agendamento-policial"

echo "🔄 Atualizando $APP_NAME..."

cd $APP_DIR

# 1. Parar app para evitar conflitos
echo "⏸️ Parando aplicação..."
pm2 stop $APP_NAME 2>/dev/null || true

# 2. Atualizar código
echo "📥 Baixando atualizações..."
git pull origin master

# 3. Instalar novas dependências (se houver)
echo "📦 Verificando dependências..."
npm install

# 4. Build da aplicação
echo "🔨 Fazendo build..."
npm run build

# 5. Reiniciar aplicação
echo "🚀 Reiniciando aplicação..."
pm2 restart $APP_NAME

# 6. Salvar estado do PM2
pm2 save

echo ""
echo "✅ Atualização concluída!"
echo ""

# Verificar status
pm2 status $APP_NAME
