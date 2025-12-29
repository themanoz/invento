export interface Product {
    id: string;
    organizationId: string;
    name: string;
    sku: string;
    description?: string;
    quantityOnHand: number;
    costPrice?: number;
    sellingPrice?: number;
    lowStockThreshold?: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductInput {
    name: string;
    sku: string;
    description?: string;
    quantityOnHand: number;
    costPrice?: number;
    sellingPrice?: number;
    lowStockThreshold?: number;
}
