"use client";

import {
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "../hooks/useCurrentUser";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, isLoading } = useCurrentUser();
  console.log(user, "user:nav")

  if (isLoading || !user) return null;

  const urlImage =
    `${process.env.NEXT_PUBLIC_API_BACKEND}/uploads/${user.avatar || 'no-avatar.jpg'}`;

  const handleLogout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="ml-auto">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg">
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarImage src={urlImage} alt={user.username} />
                    <AvatarFallback className="rounded-lg">
                      {user.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {!isMobile && (
                    <div className="grid text-left text-sm leading-tight">
                      <span className="truncate font-medium text-logo-primary">
                        {user.username}
                      </span>
                      <span className="truncate text-xs text-white">
                        {user.role}
                      </span>
                    </div>
                  )}
                  <MoreVerticalIcon className="size-4 text-white" />
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="end" sideOffset={4}>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 p-2 text-left text-sm">
                  <Avatar className="h-9 w-9 rounded-lg">
                    <AvatarImage src={urlImage} alt={user.username} />
                    <AvatarFallback className="rounded-lg">
                      {user.username?.charAt(0).toUpperCase()}
                      console.log(username, "username")
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <span className="truncate font-medium">{user.username}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.role}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className="px-3 py-2">
                  <UserCircleIcon className="mr-3 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2">
                  <CreditCardIcon className="mr-3 h-4 w-4" />
                  <span>Tema</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="px-3 py-2" onClick={handleLogout}>
                <LogOutIcon className="mr-3 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
