# Ferbely Frontend

A Next.js React application that connects to the Ferbely Django backend for property management.

## Features

- 🏢 Building Management
- 👥 User Management  
- 📋 Contract Management
- 💰 Bill Tracking
- ✅ Task Management
- 📊 Dashboard with Analytics

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ (current version warnings are shown due to Node 16)
- Django backend running on `http://localhost:8000`

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v0
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## Django Backend Configuration

For the frontend to work properly, ensure your Django backend has CORS configured:

1. **Install django-cors-headers**:
   ```bash
   pip install django-cors-headers
   ```

2. **Add to Django settings.py**:
   ```python
   INSTALLED_APPS = [
       # ... other apps
       'corsheaders',
   ]

   MIDDLEWARE = [
       # ... other middleware
       'corsheaders.middleware.CorsMiddleware',
       'django.middleware.common.CommonMiddleware',
   ]

   # CORS settings
   CORS_ALLOWED_ORIGINS = [
       "http://localhost:3000",
       "http://127.0.0.1:3000",
   ]

   # For development only
   CORS_ALLOW_ALL_ORIGINS = True
   ```

3. **Start Django server**:
   ```bash
   cd ../ferbely_api
   python manage.py runserver
   ```

## API Endpoints

The frontend connects to these Django REST API endpoints:

- `GET /api/v0/users/` - List all users
- `GET /api/v0/buildings/` - List all buildings  
- `GET /api/v0/contracts/` - List all contracts
- `GET /api/v0/tasks/` - List all tasks
- `GET /api/v0/bills/` - List all bills

Each endpoint supports full CRUD operations (GET, POST, PUT, DELETE).

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── providers/          # React context providers
├── services/           # API service functions
└── types/              # TypeScript type definitions
```

## Development

- **Components**: Create reusable components in `src/components/`
- **API Services**: Add new API functions in `src/services/api.ts`
- **Types**: Define TypeScript interfaces in `src/types/index.ts`
- **Styling**: Use Tailwind CSS classes for styling

## Error Handling

The app includes comprehensive error handling:

- Connection errors show a friendly message
- Loading states with spinners
- Automatic retry for failed requests
- JWT token management for authentication

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Use React Query for data fetching
4. Implement proper error handling
5. Add responsive design with Tailwind CSS
