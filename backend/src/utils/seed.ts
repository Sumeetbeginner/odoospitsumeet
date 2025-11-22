import prisma from '../config/database';
import { hashPassword } from './auth';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Create admin user
    const adminPassword = await hashPassword('admin123');
    await prisma.user.upsert({
      where: { email: 'admin@stockmaster.com' },
      update: {},
      create: {
        email: 'admin@stockmaster.com',
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin user created');

    // Create manager user
    const managerPassword = await hashPassword('manager123');
    await prisma.user.upsert({
      where: { email: 'manager@stockmaster.com' },
      update: {},
      create: {
        email: 'manager@stockmaster.com',
        password: managerPassword,
        firstName: 'Manager',
        lastName: 'User',
        role: 'MANAGER',
      },
    });
    console.log('✅ Manager user created');

    // Create categories
    const categories = [
      { name: 'Raw Materials', description: 'Raw materials for production' },
      { name: 'Finished Goods', description: 'Completed products ready for sale' },
      { name: 'Electronics', description: 'Electronic components and devices' },
      { name: 'Office Supplies', description: 'Office and administrative supplies' },
      { name: 'Tools', description: 'Tools and equipment' },
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      });
    }
    console.log('✅ Categories created');

    // Create warehouses and locations
    const mainWarehouse = await prisma.warehouse.upsert({
      where: { code: 'WH-MAIN' },
      update: {},
      create: {
        name: 'Main Warehouse',
        code: 'WH-MAIN',
        address: '123 Main Street, Business District',
      },
    });

    const secondaryWarehouse = await prisma.warehouse.upsert({
      where: { code: 'WH-SECOND' },
      update: {},
      create: {
        name: 'Secondary Warehouse',
        code: 'WH-SECOND',
        address: '456 Industrial Ave, Industrial Zone',
      },
    });

    console.log('✅ Warehouses created');

    // Create locations
    const locations = [
      {
        warehouseId: mainWarehouse.id,
        name: 'Receiving Area',
        code: 'LOC-RCV',
        type: 'INTERNAL' as const,
      },
      {
        warehouseId: mainWarehouse.id,
        name: 'Storage Rack A',
        code: 'LOC-RACK-A',
        type: 'INTERNAL' as const,
      },
      {
        warehouseId: mainWarehouse.id,
        name: 'Storage Rack B',
        code: 'LOC-RACK-B',
        type: 'INTERNAL' as const,
      },
      {
        warehouseId: mainWarehouse.id,
        name: 'Shipping Area',
        code: 'LOC-SHIP',
        type: 'INTERNAL' as const,
      },
      {
        warehouseId: secondaryWarehouse.id,
        name: 'General Storage',
        code: 'LOC-GEN',
        type: 'INTERNAL' as const,
      },
    ];

    for (const location of locations) {
      await prisma.location.upsert({
        where: { code: location.code },
        update: {},
        create: location,
      });
    }
    console.log('✅ Locations created');

    // Create sample products
    const electronicsCategory = await prisma.category.findUnique({
      where: { name: 'Electronics' },
    });

    const rawMaterialsCategory = await prisma.category.findUnique({
      where: { name: 'Raw Materials' },
    });

    const officeCategory = await prisma.category.findUnique({
      where: { name: 'Office Supplies' },
    });

    const products = [
      {
        name: 'Laptop - Dell XPS 15',
        sku: 'ELEC-001',
        description: 'High-performance laptop for business use',
        categoryId: electronicsCategory?.id,
        unitOfMeasure: 'Unit',
        reorderPoint: 5,
        optimalStock: 20,
      },
      {
        name: 'Wireless Mouse',
        sku: 'ELEC-002',
        description: 'Ergonomic wireless mouse',
        categoryId: electronicsCategory?.id,
        unitOfMeasure: 'Unit',
        reorderPoint: 10,
        optimalStock: 50,
      },
      {
        name: 'Steel Rods',
        sku: 'RAW-001',
        description: '20mm diameter steel rods',
        categoryId: rawMaterialsCategory?.id,
        unitOfMeasure: 'Kg',
        reorderPoint: 100,
        optimalStock: 500,
      },
      {
        name: 'Aluminum Sheets',
        sku: 'RAW-002',
        description: '2mm thickness aluminum sheets',
        categoryId: rawMaterialsCategory?.id,
        unitOfMeasure: 'Sheet',
        reorderPoint: 50,
        optimalStock: 200,
      },
      {
        name: 'Office Chair',
        sku: 'OFF-001',
        description: 'Ergonomic office chair with lumbar support',
        categoryId: officeCategory?.id,
        unitOfMeasure: 'Unit',
        reorderPoint: 3,
        optimalStock: 15,
      },
      {
        name: 'A4 Paper (Ream)',
        sku: 'OFF-002',
        description: '500 sheets per ream',
        categoryId: officeCategory?.id,
        unitOfMeasure: 'Ream',
        reorderPoint: 20,
        optimalStock: 100,
      },
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { sku: product.sku },
        update: {},
        create: product,
      });
    }
    console.log('✅ Products created');

    // Create initial stock for some products
    const rackALocation = await prisma.location.findUnique({
      where: { code: 'LOC-RACK-A' },
    });

    const laptop = await prisma.product.findUnique({
      where: { sku: 'ELEC-001' },
    });

    const mouse = await prisma.product.findUnique({
      where: { sku: 'ELEC-002' },
    });

    const paper = await prisma.product.findUnique({
      where: { sku: 'OFF-002' },
    });

    if (rackALocation && laptop) {
      await prisma.stock.upsert({
        where: {
          productId_locationId: {
            productId: laptop.id,
            locationId: rackALocation.id,
          },
        },
        update: {},
        create: {
          productId: laptop.id,
          locationId: rackALocation.id,
          quantity: 15,
          available: 15,
          reserved: 0,
        },
      });
    }

    if (rackALocation && mouse) {
      await prisma.stock.upsert({
        where: {
          productId_locationId: {
            productId: mouse.id,
            locationId: rackALocation.id,
          },
        },
        update: {},
        create: {
          productId: mouse.id,
          locationId: rackALocation.id,
          quantity: 45,
          available: 45,
          reserved: 0,
        },
      });
    }

    if (rackALocation && paper) {
      await prisma.stock.upsert({
        where: {
          productId_locationId: {
            productId: paper.id,
            locationId: rackALocation.id,
          },
        },
        update: {},
        create: {
          productId: paper.id,
          locationId: rackALocation.id,
          quantity: 85,
          available: 85,
          reserved: 0,
        },
      });
    }

    console.log('✅ Initial stock created');

    console.log('\n✨ Seeding completed successfully!');
    console.log('\n📝 Default credentials:');
    console.log('   Admin: admin@stockmaster.com / admin123');
    console.log('   Manager: manager@stockmaster.com / manager123\n');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
