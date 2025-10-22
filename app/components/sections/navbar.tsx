"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // Use o hook refatorado. Note que 'isLoading' é o nome correto agora.
  const { user, logout } = useCurrentUser(); // <-- Use 'logout' do hook

  // A função handleLogout agora chama a função 'logout' do hook
  const handleLogout = () => {
    logout();
  };

  const renderAuthButtons = (isMobileMenu: boolean = false) => {
    if (user) return null;

    const buttonSpacingClass = isMobileMenu ? "" : "mx-2"; // NENHUM ESPAÇAMENTO no mobile
    const commonButtonClass = "cursor-pointer";

    if (pathname === "/signup") {
      return (
        <Link href="/login">
          <Button className={`${commonButtonClass} bg-white text-logo-primary`}>Login</Button>
        </Link>
      );
    } else if (pathname === "/login") {
      return (
        <Link href="/signup">
          <Button className={`${commonButtonClass} bg-logo-primary text-white`}>Registre-se</Button>
        </Link>
      );
    } else {
      return (
        <>
          <Link href="/login">
            <Button className={`${commonButtonClass} bg-white text-logo-primary ${buttonSpacingClass}`}>Login</Button>
          </Link>
          <Link href="/signup">
            <Button className={`${commonButtonClass} bg-logo-primary text-white`}>Registre-se</Button>
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="w-full bg-logo-secondary">
      <div className="max-w-7xl mx-4 sm:mx-12 flex items-center justify-between p-4">
        {/* Botão de menu hambúrguer para telas pequenas (exibido apenas em `lg` ou menor) */}
        <div className="lg:hidden">
          <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Logo - centralizado em mobile, alinhado à esquerda em desktop */}
        <div className="flex-grow lg:flex-none flex justify-start lg:justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo-constrhua-horizontal-w.png"
              alt="logo-constrhua"
              width={150}
              height={60}
            />
          </Link>
        </div>

        {/* Links de navegação principais (escondidos em mobile, exibidos em desktop) */}
        <div className="hidden lg:flex flex-grow justify-center space-x-6 text-white">
          <Link href="/" className="py-1">Home</Link>
          <Link href="#" className="py-1">Parcerias</Link>
          <Link href="#" className="py-1">Notícias</Link>
          <Link href="#" className="py-1">Quem Somos</Link>
        </div>

        {/* Área de usuário/botões de autenticação */}
        <div className="lg:flex-1 flex justify-end items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="!h-10 !w-10 cursor-pointer">
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_BACKEND}/uploads/${user?.avatar || "no-avatar.jpg"}`}
                    alt={user.username}
                  />
                  <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden lg:flex items-center">
              {renderAuthButtons()}
            </div>
          )}
        </div>
      </div>

      {/* Menu mobile (aside) - Exibido apenas em telas menores que 'lg' quando `menuOpen` é true */}
      {menuOpen && (
        <div className={`lg:hidden w-full flex flex-col p-4 space-y-2 text-white`}>
          <Link href="/" className="py-1">Home</Link>
          <Link href="#" className="py-1">Parcerias</Link>
          <Link href="#" className="py-1">Notícias</Link>
          <Link href="#" className="py-1">Quem Somos</Link>

          {!user && (
            <div className="pt-2">
              {renderAuthButtons(true)}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
