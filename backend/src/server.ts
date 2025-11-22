import express from 'express';
import cors from 'cors';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';

// Routes
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import warehouseRoutes from './routes/warehouseRoutes';
import receiptRoutes from './routes/receiptRoutes';
import deliveryRoutes from './routes/deliveryRoutes';
import transferRoutes from './routes/transferRoutes';
import adjustmentRoutes from './routes/adjustmentRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/adjustments', adjustmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   StockMaster API Server Running      ║
  ║   Port: ${PORT}                          ║
  ║   Environment: ${config.nodeEnv}          ║
  ║   Time: ${new Date().toLocaleString()}   ║
  ╚═══════════════════════════════════════╝
  `);
});

export default app;
