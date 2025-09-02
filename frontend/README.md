# TaskMaster Frontend

A Vue.js 3 frontend application for the TaskMaster task management system.

## 🚀 Features

- **Task Management** - Create, read, update, delete tasks
- **Responsive Design** - Works on all screen sizes
- **TypeScript Support** - Full type safety
- **Tailwind CSS** - Modern, utility-first styling
- **Vue Router** - Client-side routing with nested routes
- **Real-time API Integration** - Connects to NestJS backend

## 🛠️ Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and dev server

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and configure your API endpoint:

```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:

```env
# For development
VITE_API_BASE_URL=http://localhost:3001

# For production
# VITE_API_BASE_URL=https://api.yourdomain.com
```

### 3. Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔧 Environment Configuration

### Environment Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3001` | `https://api.yourdomain.com` |

### Environment Files

- **`.env`** - Local development (not committed to git)
- **`.env.production`** - Production build (not committed to git)
- **`.env.example`** - Example configuration (committed to git)

### API Configuration

The application uses a centralized API configuration system located in `src/config/api.ts`:

```typescript
import { API_URLS } from '@/config/api'

// Use pre-built URLs
const response = await fetch(API_URLS.TASKS.LIST)
const response = await fetch(API_URLS.TASKS.CREATE, { method: 'POST', ... })
const response = await fetch(API_URLS.TASKS.DELETE(id), { method: 'DELETE' })
```

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── ConfirmationDialog.vue
│   ├── DataTable.vue
│   └── Navbar.vue
├── views/              # Page components
│   ├── Home.vue
│   ├── Tasks.vue
│   ├── TaskDetails.vue
│   ├── About.vue
│   └── about/
│       ├── Features.vue
│       └── TechStack.vue
├── router/             # Vue Router configuration
│   └── index.ts
├── config/             # Configuration files
│   └── api.ts         # API endpoint configuration
├── style.css           # Global styles with Tailwind CSS
├── main.ts             # Application entry point
└── App.vue             # Root component
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - TypeScript type checking

## 🌐 API Integration

The frontend integrates with the NestJS backend API:

- **Tasks CRUD** - Full task management operations
- **Real-time Updates** - Changes persist in database
- **Error Handling** - Proper error handling for API calls
- **Environment-based URLs** - Easy deployment configuration

## 🚨 Troubleshooting

### API Connection Issues

1. **Check Backend Status**: Ensure the backend is running
2. **Verify Environment**: Check `.env` file configuration
3. **CORS Issues**: Backend should allow `http://localhost:3000`
4. **Port Conflicts**: Ensure ports 3000 (frontend) and 3001 (backend) are available

### Common Issues

1. **Environment Variables Not Loading**: Restart the dev server after changing `.env`
2. **TypeScript Errors**: Run `npm run type-check` to identify issues
3. **Build Errors**: Check for missing dependencies or configuration issues

## 📚 Additional Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test API integration thoroughly
4. Update environment configuration as needed

---

**Happy coding! 🚀**
