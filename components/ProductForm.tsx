"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/product";

interface ProductFormProps {
    initialData?: Partial<Product>;
    onSubmit: (data: Partial<Product>) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export function ProductForm({
    initialData,
    onSubmit,
    onCancel,
    isLoading,
}: ProductFormProps) {
    const [formData, setFormData] = useState<Partial<Product>>({
        name: initialData?.name || "",
        sku: initialData?.sku || "",
        description: initialData?.description || "",
        quantityOnHand: initialData?.quantityOnHand || 0,
        costPrice: initialData?.costPrice || 0,
        sellingPrice: initialData?.sellingPrice || 0,
        lowStockThreshold: initialData?.lowStockThreshold || 5,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Wireless Mouse"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                        id="sku"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        required
                        placeholder="e.g. WM-001"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Optional product details"
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="quantityOnHand">Quantity *</Label>
                    <Input
                        id="quantityOnHand"
                        name="quantityOnHand"
                        type="number"
                        value={formData.quantityOnHand}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                    <Input
                        id="lowStockThreshold"
                        name="lowStockThreshold"
                        type="number"
                        value={formData.lowStockThreshold}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="costPrice">Cost Price</Label>
                    <Input
                        id="costPrice"
                        name="costPrice"
                        type="number"
                        step="0.01"
                        value={formData.costPrice}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="sellingPrice">Selling Price</Label>
                    <Input
                        id="sellingPrice"
                        name="sellingPrice"
                        type="number"
                        step="0.01"
                        value={formData.sellingPrice}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : initialData ? "Update Product" : "Create Product"}
                </Button>
            </div>
        </form>
    );
}
