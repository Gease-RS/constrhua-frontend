// app/dashboard/layout.tsx (ou onde quer que seu DashboardLayout esteja)
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./app-sidebar"; // Seu componente de sidebar
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import UserAvatarDropdown from "./user-avatar-dropdown";
import { constructionData, contaData } from "./data";
import { useCurrentUser } from '../hooks/useCurrentUser';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    // Se ainda estamos carregando, não faça nada.
    // Opcionalmente, você pode mostrar um spinner global aqui.
    if (isLoading) {
      return;
    }

    // Se não há usuário (não autenticado) OU se houve um erro (e não está carregando),
    // redirecione imediatamente para a página de login.
    if (!user && !isLoading) {
      console.log('DashboardLayout: Usuário não autenticado ou sessão inválida. Redirecionando para /login...');
      router.push('/login');
      return; // Importante: interromper a execução para evitar renderização
    }

    // Se houver um erro, mas por algum motivo o usuário existe (estado inconsistente)
    // ou você quer tratar erros de forma mais específica, pode adicionar aqui.
    if (isError) {
      console.error('DashboardLayout: Erro na autenticação. Redirecionando para /login...', isError); // 'error' viria do useCurrentUser
      router.push('/login');
      return;
    }
  }, [user, isLoading, isError, router]); // Adicione isError às dependências

  // --- Renderização Condicional ---

  // 1. Mostrar tela de carregamento enquanto a autenticação é verificada
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        color: '#333',
        fontSize: '1.2rem'
      }}>
        <p>Verificando autenticação...</p>
        {/* Aqui você pode colocar um spinner ou qualquer indicador de carregamento */}
      </div>
    );
  }

  // 2. Se não há usuário e não está carregando (significa que o redirecionamento foi acionado)
  // ou se houve um erro, não renderize nada para evitar flashes de conteúdo.
  if (!user || isError) {
    return null; // O redirecionamento já está sendo processado pelo useEffect
  }
   return (
    <SidebarProvider style={
      {
        "--sidebar-width": "200px"
      } as React.CSSProperties
    }>
      <AppSidebar />

      <main className="flex-1">
        <SidebarInset>
          <header className="sticky top-0 flex shrink-0 items-center justify-between border-b p-4 pb-12">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <div className="flex items-center">
                {constructionData.map((item) => (
                  <div className="flex h-5 items-center text-sm pl-4" key={item.title}>
                    <Button variant="outline" className="cursor-pointer">
                      <Link href={item.href}>
                        <item.icon />
                      </Link>
                    </Button>
                  </div>
                ))}
                {contaData.map((item) => (
                  <div className="flex h-5 items-center text-sm pl-4" key={item.title}>
                    <Button variant="outline" className="cursor-pointer">
                      <Link href="/">
                        <Globe />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <UserAvatarDropdown />
            </div>
          </header>
        </SidebarInset>
        {children}
      </main>
    </SidebarProvider>
  );
}