"use client";

import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { authService } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [organizationName, setOrganizationName] = useState<string>("Inventory Management");

  useEffect(() => {
    const fetchOrgName = async () => {
      try {
        const token = authService.getToken();
        if (!token) return;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          // Assuming the backend returns organizationName or we can derive it
          if (result.data?.organizationName) {
            setOrganizationName(result.data.organizationName);
          }
        }
      } catch (err) {
        console.error("Error fetching org name:", err);
      }
    };

    fetchOrgName();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <span className="font-semibold capitalize">{organizationName}</span>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
