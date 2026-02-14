# triqhuu web

Frontend React/Vite para plataforma.

## Stack

- Node.js 20
- React 18+
- Vite
- Tailwind CSS
- Docker + Nginx

## Deploy via EasyPanel

### 1. Criar Repositório

```bash
git init
git branch -M main
git add .
git commit -m "chore: initial production-ready structure"
git remote add origin https://github.com/SEU_USER/triqhub-web.git
git push -u origin main
git checkout -b develop
git push -u origin develop
```

### 2. Configurar EasyPanel

1. Criar novo App
2. Conectar repositório Git
3. Branch: `main`
4. Build: Docker
5. Port: `80`

### 3. Variáveis de Ambiente

Copiar `.env.example` para EasyPanel Environment:

```
VITE_API_URL=https://api.seudominio.com
```

### 4. Deploy

- Click "Deploy"
- Aguardar build
- Verificar logs

## Desenvolvimento Local

```bash
npm install
cp .env.example .env
# Editar .env
npm run dev
```

## Build Docker

```bash
docker build -t triqhub-web .
docker run -p 80:80 triqhub-web
```

## Versão

- 0.1.0 - Estrutura inicial production-ready
