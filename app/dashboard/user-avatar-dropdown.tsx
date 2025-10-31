'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function UserAvatarDropdown() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/current-user`, {
          credentials: 'include', 
        });

        if (!res.ok) {
          throw new Error(`Erro ao buscar usuário: ${res.status}`);
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [router]);

  if (loading) {
    return <div className="h-10 w-10 flex items-center justify-center">...</div>;
  }

  if (!user) return null;

  const urlImage = user.avatar || "/no-avatar.jpeg";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="!h-10 !w-10 cursor-pointer">
          <AvatarImage src={urlImage} alt={user.username || "Usuário"} />
          <AvatarFallback>{user.username?.charAt(0).toUpperCase() || "?"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
