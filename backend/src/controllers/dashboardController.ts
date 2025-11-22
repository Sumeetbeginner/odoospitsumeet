import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getDashboardKPIs = async (_req: AuthRequest, res: Response) => {
  try {
    // Total products in stock
    const totalProducts = await prisma.product.count({
      where: { isActive: true },
    });

    // Get all products with their stock
    const productsWithStock = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        stockLevels: true,
      },
    });

    // Calculate low stock and out of stock
    let lowStockCount = 0;
    let outOfStockCount = 0;

    productsWithStock.forEach((product) => {
      const totalStock = product.stockLevels.reduce(
        (sum, stock) => sum + stock.quantity,
        0
      );

      if (totalStock === 0) {
        outOfStockCount++;
      } else if (totalStock <= product.reorderPoint) {
        lowStockCount++;
      }
    });

    // Pending receipts
    const pendingReceipts = await prisma.receipt.count({
      where: {
        status: {
          in: ['DRAFT', 'WAITING', 'READY'],
        },
      },
    });

    // Pending deliveries
    const pendingDeliveries = await prisma.delivery.count({
      where: {
        status: {
          in: ['DRAFT', 'WAITING', 'READY'],
        },
      },
    });

    // Internal transfers scheduled
    const scheduledTransfers = await prisma.internalTransfer.count({
      where: {
        status: {
          in: ['DRAFT', 'WAITING', 'READY'],
        },
      },
    });

    // Recent activities (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentReceipts = await prisma.receipt.count({
      where: {
        status: 'DONE',
        validatedDate: {
          gte: sevenDaysAgo,
        },
      },
    });

    const recentDeliveries = await prisma.delivery.count({
      where: {
        status: 'DONE',
        validatedDate: {
          gte: sevenDaysAgo,
        },
      },
    });

    res.json({
      kpis: {
        totalProducts,
        lowStockCount,
        outOfStockCount,
        pendingReceipts,
        pendingDeliveries,
        scheduledTransfers,
        recentReceipts,
        recentDeliveries,
      },
    });
  } catch (error) {
    console.error('Get dashboard KPIs error:', error);
    res.status(500).json({ error: 'Failed to get dashboard KPIs' });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const { days = 30 } = req.query;
    const daysNum = parseInt(days as string);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysNum);

    // Stock moves by type
    const movesByType = await prisma.stockMove.groupBy({
      by: ['moveType'],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        id: true,
      },
    });

    // Recent operations
    const recentReceipts = await prisma.receipt.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      include: {
        location: {
          include: { warehouse: true },
        },
        user: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const recentDeliveries = await prisma.delivery.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      include: {
        location: {
          include: { warehouse: true },
        },
        user: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const recentTransfers = await prisma.internalTransfer.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      include: {
        fromLocation: {
          include: { warehouse: true },
        },
        toLocation: {
          include: { warehouse: true },
        },
        user: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Low stock products
    const productsWithStock = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: true,
        stockLevels: {
          include: {
            location: {
              include: { warehouse: true },
            },
          },
        },
      },
    });

    const lowStockProducts = productsWithStock
      .map((product) => {
        const totalStock = product.stockLevels.reduce(
          (sum, stock) => sum + stock.quantity,
          0
        );
        return {
          ...product,
          totalStock,
        };
      })
      .filter((product) => product.totalStock <= product.reorderPoint && product.totalStock > 0)
      .sort((a, b) => a.totalStock - b.totalStock)
      .slice(0, 10);

    res.json({
      stats: {
        movesByType,
        recentReceipts,
        recentDeliveries,
        recentTransfers,
        lowStockProducts,
      },
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to get dashboard stats' });
  }
};
