"use client"
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { constructionData, contaData, equipeData } from "./data"
import Image from "next/image";
import { NavUser } from "../components/nav-user";
import { Home } from "lucide-react";

export default function AppSidebar() {
  return (
    <Sidebar className="app-sidebar">
      <SidebarHeader className="pl-6">
        <div className="flex gap-2 py-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo-constrhua-horizontal-w.png"
              alt="Constrhua"
              width={150}
              height={60}
            />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="pl-6">
        <SidebarGroup>
        <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard" className="text-white">
                      <Home />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            </SidebarGroupContent>
          <SidebarGroupContent className="pt-2">
            <SidebarGroupLabel>
              <span className="text-logo-primary">
                CONSTRUÇÃO
              </span>
            </SidebarGroupLabel>
            <SidebarMenu>
              {constructionData.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                  <a href={item.href} className="text-white">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupContent className="pt-2">
              <SidebarGroupLabel>
                <span className="text-logo-primary">
                  EQUIPE
                </span>
              </SidebarGroupLabel>
              <SidebarMenu >
                {equipeData.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                    <a href={item.href} className="text-white">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupContent className="pt-2">
              <SidebarGroupLabel>
                <span className="text-logo-primary">
                  SISTEMA
                </span>
              </SidebarGroupLabel>
              <SidebarMenu >
                {contaData.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href} className="text-white">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}