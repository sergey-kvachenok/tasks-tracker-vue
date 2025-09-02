# TaskMaster - Full Stack Application

A modern task management application built with Vue.js frontend and NestJS backend, featuring PostgreSQL database and Docker containerization.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Vue.js)      │◄──►│   (NestJS)      │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### 1. Start the Database

```bash
# From the root directory
docker-compose up -d postgres
```

### 2. Start the Backend

```bash
cd backend
npm install
npm run start:dev
```

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
first-app/
├── frontend/                 # Vue.js frontend application
│   ├── src/
│   │   ├── components/      # Reusable Vue components
│   │   ├── views/           # Page components
│   │   ├── router/          # Vue Router configuration
│   │   └── style.css        # Global styles with Tailwind CSS
│   ├── package.json
│   └── README.md
├── backend/                  # NestJS backend API
│   ├── src/
│   │   ├── tasks/           # Tasks module (CRUD operations)
│   │   │   ├── entities/    # TypeORM entities
│   │   │   ├── dto/         # Data Transfer Objects
│   │   │   ├── tasks.service.ts
│   │   │   ├── tasks.controller.ts
│   │   │   └── tasks.module.ts
│   │   ├── app.module.ts    # Main application module
│   │   └── main.ts          # Application entry point
│   ├── database/            # Database initialization scripts
│   ├── package.json
│   └── README.md
├── docker-compose.yml        # Database services configuration
└── README.md                 # This file
```

## 🛠️ Tech Stack

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety and better development experience

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Relational database
- **Class Validator** - Input validation
- **Docker** - Containerization

## 🗄️ Database

### PostgreSQL Setup
- **Database**: `taskmaster`
- **User**: `taskmaster_user`
- **Password**: `taskmaster_password`
- **Port**: `5432`

### Database Management
- **pgAdmin**: `http://localhost:5050` (admin@taskmaster.com / admin123)
- **Direct Connection**: `localhost:5432`

## 📡 API Endpoints

### Tasks API (`http://localhost:3001/api/tasks`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get all tasks |
| `GET` | `/?status=pending` | Get tasks by status |
| `GET` | `/?priority=high` | Get tasks by priority |
| `GET` | `/:id` | Get task by ID |
| `POST` | `/` | Create new task |
| `PATCH` | `/:id` | Update task |
| `DELETE` | `/:id` | Delete task |

## 🎯 Features

### Frontend Features
- ✅ **Task Management** - Create, read, update, delete tasks
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Navigation** - Tabbed interface for About page
- ✅ **Confirmation Dialogs** - Route guards with custom UI
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Modern, utility-first styling

### Backend Features
- ✅ **CRUD Operations** - Complete task management
- ✅ **RESTful API** - Standard HTTP endpoints
- ✅ **Input Validation** - Request data validation
- ✅ **Database Integration** - PostgreSQL with TypeORM
- ✅ **CORS Support** - Frontend integration ready
- ✅ **Environment Configuration** - Flexible deployment

## 🐳 Docker Services

### Available Services

```bash
# Start PostgreSQL only
docker-compose up -d postgres

# Start PostgreSQL + pgAdmin
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs postgres
```

### Service Ports
- **PostgreSQL**: `localhost:5432`
- **pgAdmin**: `localhost:5050`

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run type-check   # TypeScript type checking
```

### Backend Development
```bash
cd backend
npm run start:dev    # Start with hot reload
npm run build        # Build the application
npm run test         # Run tests
```

### Database Development
```bash
# Connect to database
docker exec -it taskmaster_postgres psql -U taskmaster_user -d taskmaster

# View database logs
docker-compose logs postgres
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api/tasks
- **pgAdmin**: http://localhost:5050

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Frontend: Change port in `frontend/package.json`
   - Backend: Change PORT in `backend/.env`

2. **Database Connection**
   - Ensure Docker is running
   - Check `docker ps` for container status
   - Verify environment variables

3. **CORS Issues**
   - Backend allows `http://localhost:3000`
   - Update CORS config in `backend/src/main.ts` if needed

### Useful Commands

```bash
# Check running containers
docker ps

# View container logs
docker-compose logs postgres

# Restart services
docker-compose restart

# Clean up (removes volumes)
docker-compose down -v
```

## 📚 Learning Resources

- [Vue.js Documentation](https://vuejs.org/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding! 🚀**
