# StockMaster IMS - Setup Guide

## 🚀 Complete Installation Guide

This guide will help you set up and run the StockMaster Inventory Management System on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **PostgreSQL** 14.x or higher ([Download](https://www.postgresql.org/download/))
- **npm** or **yarn** package manager
- **Git** (optional, for version control)

## Step 1: Install Dependencies

### Root Level
```bash
cd stockmaster-ims
npm install
```

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 2: Database Setup

### Create PostgreSQL Database

1. **Open PostgreSQL command line** (psql):
   ```bash
   psql -U postgres
   ```

2. **Create the database**:
   ```sql
   CREATE DATABASE stockmaster;
   \q
   ```

   Or using command line:
   ```bash
   createdb stockmaster
   ```

## Step 3: Environment Configuration

### Backend Environment

Create `backend/.env` file:

```env
# Database
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/stockmaster"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production-min-32-chars"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV=development

# Email Configuration (Optional for OTP)
# If not configured, OTP will be logged to console
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="StockMaster <noreply@stockmaster.com>"
```

**Important Notes:**
- Replace `your_password` with your PostgreSQL password
- Replace `JWT_SECRET` with a strong random string (min 32 characters)
- For Gmail SMTP, use an [App Password](https://support.google.com/accounts/answer/185833)

### Frontend Environment

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 4: Database Migration & Seeding

### Run Prisma Migrations

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

This will:
- Create all database tables
- Generate Prisma Client

### Seed Initial Data

```bash
cd backend
npm run seed
```

This creates:
- Admin user: `admin@stockmaster.com` / `admin123`
- Manager user: `manager@stockmaster.com` / `manager123`
- Sample categories
- Sample warehouses and locations
- Sample products
- Initial stock levels

## Step 5: Run the Application

### Option 1: Run Both (Frontend + Backend) Together

From the root directory:

```bash
npm run dev
```

This starts:
- Backend API: http://localhost:5000
- Frontend App: http://localhost:5173

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 6: Access the Application

Open your browser and navigate to:

**Frontend:** http://localhost:5173

**Default Login Credentials:**
- **Admin:** admin@stockmaster.com / admin123
- **Manager:** manager@stockmaster.com / manager123

**Backend API:** http://localhost:5000/api

## 🎯 Quick Start Commands

```bash
# Install all dependencies
npm run install:all

# Run development servers
npm run dev

# Build for production
npm run build

# Prisma Studio (Database GUI)
cd backend && npx prisma studio
```

## 📁 Project Structure

```
stockmaster-ims/
├── backend/                  # Node.js Express API
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   └── server.ts        # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
├── frontend/                # React TypeScript App
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React Context (Auth)
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
├── package.json             # Root package.json
└── README.md               # Documentation
```

## 🔧 Troubleshooting

### Database Connection Issues

**Error:** "Connection refused" or "authentication failed"

**Solution:**
1. Verify PostgreSQL is running:
   ```bash
   # Windows
   pg_ctl status

   # Mac/Linux
   sudo systemctl status postgresql
   ```

2. Check `DATABASE_URL` in `backend/.env`
3. Verify PostgreSQL password

### Port Already in Use

**Error:** "Port 5000 is already allocated"

**Solution:**
```bash
# Find and kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

Or change port in `backend/.env`:
```env
PORT=3000
```

### Prisma Migration Errors

**Error:** "Migration failed"

**Solution:**
```bash
cd backend

# Reset database (⚠️  This deletes all data!)
npx prisma migrate reset

# Then run migrations again
npx prisma migrate dev
npx prisma generate
npm run seed
```

### Frontend Not Loading

**Error:** "Failed to fetch"

**Solution:**
1. Verify backend is running on port 5000
2. Check `VITE_API_URL` in `frontend/.env`
3. Clear browser cache
4. Check browser console for errors

### CORS Errors

**Solution:** Backend already configured with CORS. If issues persist:

In `backend/src/server.ts`, update CORS settings:
```typescript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

## 📊 Database Management

### Prisma Studio (GUI)

Access the database with a visual interface:

```bash
cd backend
npx prisma studio
```

Opens at: http://localhost:5555

### Reset Database

**⚠️ Warning: This deletes all data!**

```bash
cd backend
npx prisma migrate reset
npm run seed
```

### View Database Schema

```bash
cd backend
npx prisma db pull
```

## 🔐 User Roles & Permissions

### ADMIN
- Full system access
- Manage all entities (products, operations, warehouses)
- User management (future feature)

### MANAGER
- Manage products and inventory
- Create and validate operations
- View all reports and history

### STAFF
- View products and inventory
- Create operations (receipts, deliveries, transfers)
- Cannot validate operations
- View move history

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request OTP
- `POST /api/auth/reset-password` - Reset password with OTP
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/:id/stock` - Get stock levels

### Receipts
- `GET /api/receipts` - List receipts
- `POST /api/receipts` - Create receipt
- `GET /api/receipts/:id` - Get receipt
- `PUT /api/receipts/:id/validate` - Validate (increase stock)
- `PUT /api/receipts/:id/cancel` - Cancel receipt

### Deliveries
- `GET /api/deliveries` - List deliveries
- `POST /api/deliveries` - Create delivery
- `GET /api/deliveries/:id` - Get delivery
- `PUT /api/deliveries/:id/validate` - Validate (decrease stock)
- `PUT /api/deliveries/:id/cancel` - Cancel delivery

### Transfers
- `GET /api/transfers` - List transfers
- `POST /api/transfers` - Create transfer
- `GET /api/transfers/:id` - Get transfer
- `PUT /api/transfers/:id/validate` - Validate (move stock)
- `PUT /api/transfers/:id/cancel` - Cancel transfer

### Adjustments
- `GET /api/adjustments` - List adjustments
- `POST /api/adjustments` - Create adjustment
- `GET /api/adjustments/:id` - Get adjustment
- `PUT /api/adjustments/:id/validate` - Validate (adjust stock)
- `PUT /api/adjustments/:id/cancel` - Cancel adjustment
- `GET /api/adjustments/moves/history` - Stock move history

### Dashboard
- `GET /api/dashboard/kpis` - Get dashboard KPIs
- `GET /api/dashboard/stats` - Get statistics

### Warehouses
- `GET /api/warehouses` - List warehouses
- `POST /api/warehouses` - Create warehouse
- `GET /api/warehouses/locations` - List locations
- `POST /api/warehouses/locations` - Create location

## 🚢 Production Deployment

### Build for Production

```bash
# Backend
cd backend
npm run build
npm run start

# Frontend
cd frontend
npm run build
# Serve the dist/ folder with nginx or similar
```

### Environment Variables for Production

Update `backend/.env`:
```env
NODE_ENV=production
JWT_SECRET="<strong-random-secret-min-64-chars>"
DATABASE_URL="<production-database-url>"
```

### Database Migration (Production)

```bash
cd backend
npx prisma migrate deploy
```

## 📝 Development Tips

### Hot Reload
Both frontend and backend support hot reload during development.

### TypeScript Errors
```bash
# Backend
cd backend && npx tsc --noEmit

# Frontend
cd frontend && npm run build
```

### Code Formatting
Consider adding Prettier:
```bash
npm install --save-dev prettier
```

## 🆘 Support

For issues or questions:
1. Check this SETUP.md file
2. Review backend console logs
3. Check browser console (F12)
4. Review API responses in Network tab

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Express.js Documentation](https://expressjs.com)

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] Node.js 18+ installed
- [ ] Database created (`stockmaster`)
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] Dependencies installed (backend & frontend)
- [ ] Prisma migrations run
- [ ] Database seeded
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can login with demo credentials
- [ ] Dashboard loads successfully

## 🎉 Success!

If you can see the dashboard with KPIs after logging in, your setup is complete!

You now have a fully functional Inventory Management System with:
✅ Authentication with JWT
✅ Real-time inventory tracking
✅ Product management
✅ Stock operations (receipts, deliveries, transfers, adjustments)
✅ Multi-warehouse support
✅ Complete audit trail
✅ Responsive UI with Tailwind CSS
✅ PostgreSQL database with Prisma ORM

Happy managing! 📦

