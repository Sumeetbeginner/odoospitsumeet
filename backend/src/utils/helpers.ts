export const generateReference = (prefix: string): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

export const calculateAvailableQuantity = (
  quantity: number,
  reserved: number
): number => {
  return Math.max(0, quantity - reserved);
};

