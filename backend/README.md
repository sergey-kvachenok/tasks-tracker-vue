# TaskMaster Backend

A NestJS backend API for the TaskMaster application with PostgreSQL database.

## 🚀 Features

- **CRUD Operations** for tasks
- **PostgreSQL Database** with TypeORM
- **RESTful API** endpoints
- **Input Validation** with class-validator
- **CORS enabled** for frontend integration
- **Environment Configuration** support

## 🛠️ Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Relational database
- **Docker Compose** - Database containerization
- **Class Validator** - Input validation
- **TypeScript** - Type safety

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## 🚀 Quick Start

### 1. Start the Database

```bash
# From the root directory (first-app/)
docker-compose up -d postgres
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Start the Backend

```bash
npm run start:dev
```

The backend will be available at `http://localhost:3001`

## 🗄️ Database Setup

The PostgreSQL database will be automatically created with:
- **Database**: `taskmaster`
- **User**: `taskmaster_user`
- **Password**: `taskmaster_password`
- **Port**: `5432`

### Database Schema

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📡 API Endpoints

### Tasks API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks?status=pending` | Get tasks by status |
| `GET` | `/api/tasks?priority=high` | Get tasks by priority |
| `GET` | `/api/tasks/:id` | Get task by ID |
| `POST` | `/api/tasks` | Create new task |
| `PATCH` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |

### Task Status Values
- `pending`
- `in_progress`
- `completed`
- `cancelled`

### Task Priority Values
- `low`
- `medium`
- `high`
- `urgent`

## 📝 Example API Usage

### Create a Task

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Complete project documentation",
    "description": "Write comprehensive docs",
    "priority": "high",
    "status": "pending"
  }'
```

### Get All Tasks

```bash
curl http://localhost:3001/api/tasks
```

### Update a Task

```bash
curl -X PATCH http://localhost:3001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

## 🔧 Development

### Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run test:e2e` - Run end-to-end tests

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=taskmaster_user
DB_PASSWORD=taskmaster_password
DB_DATABASE=taskmaster

# Application Configuration
PORT=3001
NODE_ENV=development
```

## 🐳 Docker

### Start Database Only

```bash
docker-compose up -d postgres
```

### Start Database + pgAdmin

```bash
docker-compose up -d
```

- **PostgreSQL**: `localhost:5432`
- **pgAdmin**: `http://localhost:5050` (admin@taskmaster.com / admin123)

### Stop Services

```bash
docker-compose down
```

## 🔍 Database Management

### Using pgAdmin

1. Open `http://localhost:5050`
2. Login with `admin@taskmaster.com` / `admin123`
3. Add new server:
   - Host: `postgres`
   - Port: `5432`
   - Database: `taskmaster`
   - Username: `taskmaster_user`
   - Password: `taskmaster_password`

### Using psql

```bash
docker exec -it taskmaster_postgres psql -U taskmaster_user -d taskmaster
```

## 🚨 Troubleshooting

### Port Already in Use

If port 3001 is already in use, change the PORT in your `.env` file:

```env
PORT=3002
```

### Database Connection Issues

1. Ensure Docker is running
2. Check if PostgreSQL container is up: `docker ps`
3. Verify environment variables in `.env`
4. Check Docker Compose logs: `docker-compose logs postgres`

### CORS Issues

The backend is configured to allow requests from `http://localhost:3000`. If your frontend runs on a different port, update the CORS configuration in `main.ts`.

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
