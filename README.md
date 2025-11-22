# StockMaster - Inventory Management System

**Hackathon**: Odoo X SPIT Hackathon
**Team**: Neurabytes
**Members**: Sumeet Gupta, Pankaj Chaudhary, Harsh Yadav

A comprehensive, modular inventory management system built with React TypeScript and Node.js.

## Features

- 🔐 **Authentication**: JWT-based auth with OTP password reset
- 📊 **Dashboard**: Real-time KPIs and inventory insights
- 📦 **Product Management**: Complete CRUD with categories and reorder rules
- 📥 **Receipts**: Incoming stock management from vendors
- 📤 **Deliveries**: Outgoing stock for customer shipments
- 🔄 **Internal Transfers**: Move stock between warehouses/locations
- 📝 **Stock Adjustments**: Fix discrepancies between records and physical count
- 📜 **Move History**: Complete audit trail of all stock movements
- 🏢 **Multi-warehouse**: Support for multiple warehouses and locations
- 🔍 **Smart Filters**: Filter by type, status, location, and category
- ⚠️ **Low Stock Alerts**: Get notified when products reach reorder point

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL (via Prisma ORM)
- JWT Authentication
- Nodemailer (for OTP emails)

### Frontend
- React 18
- TypeScript
- React Router v6
- Axios
- Tailwind CSS
- Recharts (for dashboard charts)

## Project Structure

```
stockmaster-ims/
├── backend/           # Node.js Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── types/
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
├── frontend/          # React TypeScript App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
└── package.json       # Root workspace
```

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd stockmaster-ims
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Set up PostgreSQL database**
```bash
# Create a new database
createdb stockmaster
```

4. **Configure environment variables**

Create `backend/.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/stockmaster"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=development

# Email configuration for OTP
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="StockMaster <noreply@stockmaster.com>"
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. **Run database migrations**
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
cd ..
```

6. **Seed initial data (optional)**
```bash
cd backend
npm run seed
cd ..
```

### Running the Application

**Development mode** (runs both frontend and backend):
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

### Default Admin Credentials
```
Email: admin@stockmaster.com
Password: admin123
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request OTP
- `POST /api/auth/reset-password` - Reset password with OTP
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/:id/stock` - Get stock levels by location

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category

### Receipts
- `GET /api/receipts` - List receipts
- `POST /api/receipts` - Create receipt
- `PUT /api/receipts/:id/validate` - Validate receipt (increase stock)

### Deliveries
- `GET /api/deliveries` - List deliveries
- `POST /api/deliveries` - Create delivery
- `PUT /api/deliveries/:id/validate` - Validate delivery (decrease stock)

### Internal Transfers
- `GET /api/transfers` - List transfers
- `POST /api/transfers` - Create transfer
- `PUT /api/transfers/:id/validate` - Validate transfer (move stock)

### Stock Adjustments
- `GET /api/adjustments` - List adjustments
- `POST /api/adjustments` - Create adjustment
- `PUT /api/adjustments/:id/validate` - Validate adjustment

### Move History
- `GET /api/moves` - Get stock move history

### Warehouses
- `GET /api/warehouses` - List warehouses
- `POST /api/warehouses` - Create warehouse

### Dashboard
- `GET /api/dashboard/kpis` - Get dashboard KPIs
- `GET /api/dashboard/stats` - Get inventory statistics

## Features in Detail

### Dashboard KPIs
- Total products in stock
- Low stock items (below reorder point)
- Out of stock items
- Pending receipts (not validated)
- Pending deliveries (not validated)
- Internal transfers scheduled

### Stock Operations Flow

**1. Receipt (Incoming Stock)**
```
Vendor → Warehouse
- Create receipt
- Add products and quantities
- Validate → Stock increases
```

**2. Delivery (Outgoing Stock)**
```
Warehouse → Customer
- Create delivery order
- Pick items
- Validate → Stock decreases
```

**3. Internal Transfer**
```
Location A → Location B
- Create transfer
- Validate → Stock moves (no change in total)
```

**4. Stock Adjustment**
```
Physical Count ≠ System Count
- Enter actual counted quantity
- System auto-calculates difference
- Validate → Stock adjusted
```

### User Roles
- **Admin**: Full access to all features
- **Inventory Manager**: Manage stock operations
- **Warehouse Staff**: Execute transfers and counting

## Database Schema

Key entities:
- Users
- Products
- Categories
- Warehouses & Locations
- Stock (product + location + quantity)
- Receipts, Deliveries, Transfers, Adjustments
- Stock Moves (complete audit trail)
- Reorder Rules

## Development

### Backend Development
```bash
cd backend
npm run dev        # Start dev server with hot reload
npm run build      # Build for production
npm run start      # Run production build
npx prisma studio  # Open Prisma Studio (DB GUI)
```

### Frontend Development
```bash
cd frontend
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Production Deployment

### Backend
```bash
cd backend
npm run build
npm run start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the dist/ folder with nginx or similar
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning and commercial purposes.

## Support

For issues and questions, please create an issue in the GitHub repository.
