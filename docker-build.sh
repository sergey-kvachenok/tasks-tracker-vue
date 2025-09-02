#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🐳 Building and running TaskMaster application...${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found! Please create one with your database password.${NC}"
    exit 1
fi

# Load environment variables
source .env

# Check if DB_PASSWORD is set
if [ -z "$DB_PASSWORD" ]; then
    echo -e "${RED}❌ DB_PASSWORD not set in .env file!${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Building Docker images...${NC}"

# Build all services
docker-compose -f docker-compose.prod.yml build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker images built successfully!${NC}"
else
    echo -e "${RED}❌ Failed to build Docker images${NC}"
    exit 1
fi

echo -e "${YELLOW}🚀 Starting services...${NC}"

# Start all services
docker-compose -f docker-compose.prod.yml up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Services started successfully!${NC}"
    echo -e "${GREEN}🌐 Frontend: http://localhost${NC}"
    echo -e "${GREEN}🔧 Backend API: http://localhost:3001${NC}"
    echo -e "${GREEN}🗄️  Database: localhost:5432${NC}"
else
    echo -e "${RED}❌ Failed to start services${NC}"
    exit 1
fi

echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 10

# Check service health
echo -e "${YELLOW}🔍 Checking service health...${NC}"
docker-compose -f docker-compose.prod.yml ps

echo -e "${GREEN}🎉 TaskMaster is now running!${NC}"
echo -e "${YELLOW}📋 Use 'docker-compose -f docker-compose.prod.yml logs -f' to view logs${NC}"
echo -e "${YELLOW}🛑 Use 'docker-compose -f docker-compose.prod.yml down' to stop services${NC}"
