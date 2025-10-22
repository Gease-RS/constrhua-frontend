"use client"

import Link from "next/link"
import Image from 'next/image';
import { usePathname } from "next/navigation"
import { Home, Building, Box, Newspaper, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home
    },
    {
      name: "Meus Projetos",
      href: "/projects",
      icon: Building
    },
    {
      name: "Produtos",
      href: "/user/products",
      icon: Box
    },
    {
      name: "Notícias",
      href: "/user/news",
      icon: Newspaper
    },
    {
      name: "Configurações",
      href: "/settings",
      icon: Settings
    },
    {
      name: "Ajuda",
      href: "/help",
      icon: HelpCircle
    }
  ]

  return (
    <div className="hidden md:flex flex-col w-64 h-screen fixed border-r bg-white">
      <div className="p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image 
            src="/logo-hw.png"
            alt="Constrhua Logo"
            width={120}
            height={40}
          />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-constrhua-primary/10 text-constrhua-primary"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/logout">Sair</Link>
        </Button>
      </div>
    </div>
  )
}