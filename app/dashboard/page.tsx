"use client";

import { useEffect, useState } from "react";
import { authService } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Package, AlertTriangle, Boxes } from "lucide-react";

interface DashboardStats {
  totalProducts: number;
  totalStock: number;
  lowStockItems: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const result = await response.json();
        setStats(result.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-destructive bg-destructive/10 rounded-lg text-destructive">
        {error}
      </div>
    );
  }

  if (stats?.totalProducts === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your inventory and stock levels.
          </p>
        </div>

        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2">
          <div className="flex aspect-square size-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <Package className="size-8" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Invento!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground max-w-sm mx-auto">
              Your inventory is currently empty. Start by adding your first product to see insights, stock levels, and low-stock alerts.
            </p>
            <div className="pt-4">
              <a href="/dashboard/products">
                <Button size="lg" className="cursor-pointer">
                  <Boxes className="mr-2 h-5 w-5" />
                  Add My First Product
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your inventory and stock levels.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalProducts || 0}</div>
            <p className="text-xs text-muted-foreground">Unique items in catalog</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock on Hand</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalStock || 0}</div>
            <p className="text-xs text-muted-foreground">Total units across all products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats?.lowStockItems.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Items requiring restock</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Low Stock Alert</CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.lowStockItems && stats.lowStockItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Threshold</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.lowStockItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell className="text-destructive font-bold">
                      {item.quantityOnHand}
                    </TableCell>
                    <TableCell>{item.lowStockThreshold || 5}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No low stock items detected. You're all set!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
