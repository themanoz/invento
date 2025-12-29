"use client";

import { useEffect, useState } from "react";
import { authService } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, AlertCircle } from "lucide-react";

export default function SettingsPage() {
    const [defaultThreshold, setDefaultThreshold] = useState(5);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const token = authService.getToken();
                if (!token) return;

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setDefaultThreshold(data.defaultLowStockThreshold || 5);
                }
            } catch (err) {
                console.error("Error fetching settings:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            const token = authService.getToken();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ defaultLowStockThreshold: defaultThreshold }),
                }
            );

            if (!response.ok) throw new Error("Failed to save settings");

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError("Failed to save settings. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Configure your organization's global preferences.
                </p>
            </div>

            <div className="max-w-2xl">
                <form onSubmit={handleSave}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Inventory Settings</CardTitle>
                            <CardDescription>
                                Configure default values for your inventory management modules.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="threshold">Default Low Stock Threshold</Label>
                                <Input
                                    id="threshold"
                                    type="number"
                                    min="0"
                                    value={defaultThreshold}
                                    onChange={(e) => setDefaultThreshold(parseInt(e.target.value))}
                                />
                                <p className="text-xs text-muted-foreground">
                                    This value will be used for products that don't have a specific threshold set.
                                </p>
                            </div>

                            {error && (
                                <div className="p-3 text-sm border border-destructive bg-destructive/10 rounded-md text-destructive flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="p-3 text-sm border border-green-500 bg-green-500/10 rounded-md text-green-500 flex items-center gap-2">
                                    Settings saved successfully!
                                </div>
                            )}

                            <div className="pt-4">
                                <Button type="submit" disabled={saving}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {saving ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
}
