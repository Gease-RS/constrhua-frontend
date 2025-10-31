"use client"

import { Users, UserPen, Globe, FilePlus, FilePenLine, Pencil, SquarePen, ClipboardPlus, HousePlus, UserPlus, UserRoundPlus } from "lucide-react";
  const constructionData = [
    { title: "Nova", href: "/dashboard/new-construction", icon: HousePlus},
    { title: "Editar", href: "/dashboard/edit-constructions", icon: FilePenLine },
    { title: "Add Fase", href: "/dashboard/add-phase", icon: ClipboardPlus},
    { title: "Editar Fase", href: "/dashboard/edit-phase", icon: SquarePen},
    { title: "Add Estágio", href: "/dashboard/new-stage", icon: FilePlus },
    { title: "Editar Estágio", href: "/dashboard/edit-stage", icon: Pencil},
  ];

  const equipeData = [
    { title: "Profissionais", href: "/dashboard/professionals", icon: Users },
    { title: "Novo Profissional", href: "/dashboard/new-professionals", icon: UserPlus },
    { title: "Equipe", href: "/dashboard/team", icon: Users },
    { title: "Nova Equipe", href: "/dashboard/new-team", icon: UserRoundPlus },
  ];
  
  const contaData = [
    { title: "Profile", href: "/dashboard/profile", icon: UserPen },
    { title: "Website", href: "/", icon: Globe },
  ];
  

export { constructionData, contaData, equipeData }