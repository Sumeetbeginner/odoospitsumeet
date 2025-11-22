export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  categoryId?: string;
  category?: Category;
  unitOfMeasure: string;
  reorderPoint: number;
  optimalStock: number;
  imageUrl?: string;
  isActive: boolean;
  totalStock?: number;
  totalAvailable?: number;
  isLowStock?: boolean;
  isOutOfStock?: boolean;
  createdAt: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address?: string;
  isActive: boolean;
  locations?: Location[];
}

export interface Location {
  id: string;
  warehouseId: string;
  warehouse?: Warehouse;
  name: string;
  code: string;
  type: 'SUPPLIER' | 'INTERNAL' | 'CUSTOMER' | 'PRODUCTION' | 'SCRAP';
  isActive: boolean;
}

export interface Stock {
  id: string;
  productId: string;
  product?: Product;
  locationId: string;
  location?: Location;
  quantity: number;
  reserved: number;
  available: number;
}

export type OperationStatus = 'DRAFT' | 'WAITING' | 'READY' | 'DONE' | 'CANCELLED';

export interface Receipt {
  id: string;
  reference: string;
  supplierName: string;
  locationId: string;
  location?: Location;
  status: OperationStatus;
  scheduledDate?: string;
  validatedDate?: string;
  userId: string;
  user?: { id: string; firstName: string; lastName: string };
  notes?: string;
  lines?: ReceiptLine[];
  createdAt: string;
}

export interface ReceiptLine {
  id: string;
  receiptId: string;
  productId: string;
  product?: Product;
  quantity: number;
  receivedQty: number;
}

export interface Delivery {
  id: string;
  reference: string;
  customerName: string;
  locationId: string;
  location?: Location;
  status: OperationStatus;
  scheduledDate?: string;
  validatedDate?: string;
  userId: string;
  user?: { id: string; firstName: string; lastName: string };
  notes?: string;
  lines?: DeliveryLine[];
  createdAt: string;
}

export interface DeliveryLine {
  id: string;
  deliveryId: string;
  productId: string;
  product?: Product;
  quantity: number;
  deliveredQty: number;
}

export interface InternalTransfer {
  id: string;
  reference: string;
  fromLocationId: string;
  fromLocation?: Location;
  toLocationId: string;
  toLocation?: Location;
  status: OperationStatus;
  scheduledDate?: string;
  validatedDate?: string;
  userId: string;
  user?: { id: string; firstName: string; lastName: string };
  notes?: string;
  lines?: TransferLine[];
  createdAt: string;
}

export interface TransferLine {
  id: string;
  transferId: string;
  productId: string;
  product?: Product;
  quantity: number;
}

export interface StockAdjustment {
  id: string;
  reference: string;
  locationId: string;
  location?: Location;
  status: OperationStatus;
  adjustmentDate?: string;
  userId: string;
  user?: { id: string; firstName: string; lastName: string };
  reason?: string;
  lines?: AdjustmentLine[];
  createdAt: string;
}

export interface AdjustmentLine {
  id: string;
  adjustmentId: string;
  productId: string;
  product?: Product;
  systemQty: number;
  countedQty: number;
  difference: number;
}

export interface StockMove {
  id: string;
  reference: string;
  productId: string;
  product?: Product;
  fromLocationId?: string;
  fromLocation?: Location;
  toLocationId?: string;
  toLocation?: Location;
  quantity: number;
  moveType: 'RECEIPT' | 'DELIVERY' | 'TRANSFER' | 'ADJUSTMENT';
  status: 'DRAFT' | 'DONE' | 'CANCELLED';
  userId: string;
  user?: { id: string; firstName: string; lastName: string };
  createdAt: string;
}

export interface DashboardKPIs {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
  pendingReceipts: number;
  pendingDeliveries: number;
  scheduledTransfers: number;
  recentReceipts: number;
  recentDeliveries: number;
}

