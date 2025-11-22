# StockMaster - Complete Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [System Overview](#system-overview)
3. [Getting Started](#getting-started)
4. [Core Features](#core-features)
5. [User Roles & Permissions](#user-roles--permissions)
6. [Operations Guide](#operations-guide)
7. [Best Practices](#best-practices)
8. [Technical Architecture](#technical-architecture)

---

## Introduction

StockMaster is a comprehensive inventory management system designed to help businesses track, manage, and optimize their stock levels across multiple warehouses and locations. It provides real-time inventory tracking, automated alerts, and a complete audit trail of all stock movements.

### Key Benefits

- **Real-time Inventory Tracking**: Always know what you have in stock
- **Multi-Warehouse Support**: Manage inventory across multiple locations
- **Automated Alerts**: Get notified when stock levels are low
- **Complete Audit Trail**: Track every movement with full history
- **Role-Based Access**: Control who can perform what actions
- **User-Friendly Interface**: Intuitive design for easy navigation

---

## System Overview

### Architecture

StockMaster consists of:

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based with role-based access control

### Core Concepts

#### Products
Products are items in your inventory catalog. Each product has:
- Unique SKU (Stock Keeping Unit)
- Name and description
- Category
- Unit of measure (Unit, Kg, L, etc.)
- Reorder point (minimum stock level)
- Optimal stock level
- Stock levels by location

#### Warehouses & Locations
- **Warehouse**: A physical storage facility
- **Location**: A specific area within a warehouse (e.g., Aisle 1, Shelf B)
- **Location Types**: INTERNAL, SUPPLIER, CUSTOMER, PRODUCTION, SCRAP

#### Stock Operations
Four main types of operations:
1. **Receipts**: Incoming stock from suppliers
2. **Deliveries**: Outgoing stock to customers
3. **Transfers**: Moving stock between locations
4. **Adjustments**: Correcting stock discrepancies

#### Stock Moves
Every validated operation creates stock move records, providing a complete audit trail.

---

## Getting Started

### Initial Setup

1. **Create Your First Warehouse**
   - Go to Settings → Warehouses
   - Create a warehouse with a unique code
   - Add locations within the warehouse

2. **Add Products**
   - Navigate to Products
   - Click "Add Product"
   - Fill in product details
   - Set reorder points for automatic alerts

3. **Create Your First Receipt**
   - Go to Receipts → New Receipt
   - Enter supplier information
   - Select location
   - Add products and quantities
   - Validate to update stock

### Dashboard Overview

The dashboard shows:
- Total products count
- Low stock and out of stock alerts
- Pending operations (receipts, deliveries, transfers)
- Recent activity (last 7 days)
- Visual charts of stock movements

---

## Core Features

### 1. Product Management

#### Creating Products
1. Click "Add Product" from Products page
2. Enter required information:
   - Product name
   - SKU (must be unique)
   - Category (optional)
   - Unit of measure
   - Reorder point
   - Optimal stock level
3. Save the product

#### Managing Stock Levels
- View stock by location on product details page
- See total, reserved, and available quantities
- Track stock across all warehouses

#### Low Stock Alerts
- Products below reorder point are automatically flagged
- Dashboard shows count of low stock items
- Filter products by low stock status

### 2. Receipts (Incoming Stock)

#### Purpose
Record stock received from suppliers and increase inventory levels.

#### Workflow
1. **Create Receipt**: Enter supplier, location, and products
2. **Status: DRAFT**: Created but not yet processed
3. **Validate**: ADMIN/MANAGER validates to update stock
4. **Status: DONE**: Stock levels updated, move records created

#### Key Points
- Only ADMIN and MANAGER can validate receipts
- Validation creates stock moves in history
- Stock increases at selected location

### 3. Deliveries (Outgoing Stock)

#### Purpose
Record stock shipped to customers and decrease inventory levels.

#### Workflow
1. **Create Delivery**: Enter customer, location, and products
2. **Check Availability**: System verifies stock availability
3. **Validate**: ADMIN/MANAGER validates to update stock
4. **Status: DONE**: Stock levels decreased, move records created

#### Key Points
- System checks stock availability before validation
- Stock decreases at selected location
- Cannot validate if insufficient stock

### 4. Transfers (Internal Movements)

#### Purpose
Move stock between locations within your warehouse network.

#### Workflow
1. **Create Transfer**: Select from/to locations
2. **Add Products**: Specify quantities to transfer
3. **Validate**: ADMIN/MANAGER validates the transfer
4. **Stock Updated**: Decreases at source, increases at destination

#### Key Points
- From and to locations must be different
- Both locations must have sufficient stock
- Creates move records for both locations

### 5. Stock Adjustments

#### Purpose
Reconcile physical stock counts with system records.

#### When to Use
- After physical inventory counts
- When discrepancies are found
- To correct system errors

#### Workflow
1. **Create Adjustment**: Select location
2. **Enter Counted Quantities**: For each product
3. **System Calculates Difference**: 
   - Positive = increase (counted more)
   - Negative = decrease (counted less)
4. **Validate**: Updates stock to match physical count

#### Understanding Differences
- **System Qty**: What the system shows
- **Counted Qty**: What you physically counted
- **Difference**: Counted - System
  - Positive difference = stock increase
  - Negative difference = stock decrease

#### Move History
Adjustments appear in move history with:
- Red arrow (↓) for decreases
- Green arrow (↑) for increases

### 6. Move History

#### Purpose
Complete audit trail of all stock movements.

#### Features
- Filter by move type (Receipt, Delivery, Transfer, Adjustment)
- Search by reference, product name, or SKU
- View from/to locations
- See user who performed operation
- Track date and time of each move

#### Understanding Adjustment Moves
- Adjustments show special indicators:
  - **Decrease**: Red arrow pointing down at from location
  - **Increase**: Green arrow pointing up at to location

---

## User Roles & Permissions

### ADMIN
**Full System Access**
- Create, edit, and delete all records
- Validate all operations
- Manage warehouses and locations
- View all reports and history
- User management (future feature)

### MANAGER
**Inventory Management**
- Manage products and inventory
- Create and validate operations
- View all reports and history
- Cannot delete critical records
- Cannot manage users

### STAFF
**Operational Access**
- View products and inventory
- Create operations (receipts, deliveries, transfers)
- **Cannot validate operations**
- View move history
- Limited to viewing only

---

## Operations Guide

### Creating a Receipt

1. Navigate to **Receipts** → **New Receipt**
2. Enter **Supplier Name**
3. Select **Location** (where stock will be received)
4. Add products:
   - Click "Add Product"
   - Select product from dropdown
   - Enter quantity
   - Repeat for all products
5. Set **Scheduled Date** (optional)
6. Add **Notes** (optional)
7. Click **Create Receipt**

**Next Steps**: ADMIN or MANAGER must validate to update stock.

### Creating a Delivery

1. Navigate to **Deliveries** → **New Delivery**
2. Enter **Customer Name**
3. Select **Location** (where stock will ship from)
4. Add products and quantities
5. System checks stock availability
6. Set scheduled date and notes
7. Click **Create Delivery**

**Note**: Ensure sufficient stock before validation.

### Creating a Transfer

1. Navigate to **Transfers** → **New Transfer**
2. Select **From Location** (source)
3. Select **To Location** (destination)
   - Must be different from source
4. Add products and quantities
5. Click **Create Transfer**

**Note**: Both locations need sufficient stock.

### Creating an Adjustment

1. Navigate to **Adjustments** → **New Adjustment**
2. Select **Location** to adjust
3. Add products:
   - Select product
   - Enter **Counted Quantity** (what you physically counted)
   - System shows current system quantity
   - System calculates difference automatically
4. Add **Reason** for adjustment (optional)
5. Click **Create Adjustment**

**Understanding the Results**:
- If counted > system: Positive difference (increase)
- If counted < system: Negative difference (decrease)
- If counted = system: Zero difference (no change)

---

## Best Practices

### Product Management

1. **Use Descriptive SKUs**: Make them easy to identify
2. **Set Realistic Reorder Points**: Based on lead times and usage
3. **Organize with Categories**: Group related products
4. **Regular Stock Checks**: Use adjustments to reconcile

### Operations

1. **Validate Promptly**: Don't leave operations in DRAFT
2. **Use Scheduled Dates**: For better planning
3. **Add Notes**: Document important information
4. **Check Stock Before Deliveries**: Avoid validation errors

### Inventory Accuracy

1. **Regular Physical Counts**: Schedule periodic adjustments
2. **Review Move History**: Regularly audit movements
3. **Monitor Low Stock Alerts**: Reorder before running out
4. **Document Discrepancies**: Use adjustment reasons

### Security

1. **Role-Based Access**: Assign appropriate roles
2. **Validate Operations**: Only authorized users
3. **Audit Trail**: Review move history regularly
4. **Secure Credentials**: Protect user accounts

---

## Technical Architecture

### Frontend Stack
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **React Router**: Navigation
- **Recharts**: Data visualization
- **Axios**: HTTP client
- **Lucide React**: Icons

### Backend Stack
- **Node.js**: Runtime
- **Express**: Web framework
- **TypeScript**: Type safety
- **Prisma**: ORM
- **PostgreSQL**: Database
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Nodemailer**: Email service

### Database Schema

#### Core Models
- **User**: System users with roles
- **Product**: Inventory items
- **Category**: Product categories
- **Warehouse**: Storage facilities
- **Location**: Areas within warehouses
- **Stock**: Current stock levels by location
- **StockMove**: Audit trail of movements

#### Operation Models
- **Receipt**: Incoming stock operations
- **Delivery**: Outgoing stock operations
- **InternalTransfer**: Stock transfers
- **StockAdjustment**: Stock corrections

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request OTP
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user

#### Products
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/:id/stock` - Get stock levels

#### Operations
- `GET /api/receipts` - List receipts
- `POST /api/receipts` - Create receipt
- `GET /api/receipts/:id` - Get receipt
- `PUT /api/receipts/:id/validate` - Validate receipt
- `PUT /api/receipts/:id/cancel` - Cancel receipt

Similar endpoints for deliveries, transfers, and adjustments.

#### Dashboard
- `GET /api/dashboard/kpis` - Get KPIs
- `GET /api/dashboard/stats` - Get statistics

#### Stock Moves
- `GET /api/adjustments/moves/history` - Get move history

### Environment Variables

#### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/stockmaster
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
SMTP_FROM=StockMaster <noreply@stockmaster.com>
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

---

## Troubleshooting

### Common Issues

#### Adjustments Not Showing in Move History
- **Cause**: Adjustment not validated or difference is zero
- **Solution**: 
  1. Ensure adjustment is validated (status = DONE)
  2. Check that difference is not zero
  3. Refresh move history page
  4. Check filters (ensure ADJUSTMENT type is selected)

#### Cannot Validate Operation
- **Cause**: Insufficient permissions or stock
- **Solution**:
  1. Check user role (must be ADMIN or MANAGER)
  2. For deliveries: Verify stock availability
  3. For transfers: Check both locations have stock

#### Low Stock Not Alerting
- **Cause**: Reorder point not set or stock above threshold
- **Solution**:
  1. Set reorder point on product
  2. Check current stock level
  3. Stock must be at or below reorder point

### Support

For additional help:
- Check the Help page in the application
- Review this documentation
- Contact your system administrator

---

## Conclusion

StockMaster provides a comprehensive solution for inventory management. By following this documentation and best practices, you can effectively manage your inventory, reduce stockouts, and maintain accurate records.

Remember:
- Always validate operations to update stock
- Set appropriate reorder points
- Regularly review move history
- Use adjustments to maintain accuracy
- Follow role-based permissions

Happy inventory managing! 📦

