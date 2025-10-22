"use client"

import { BookmarkMinus, BookmarkPlus, Users, UserPen, Home } from "lucide-react";
const constructionData = [
    { title: "Minhas Construções", href: "/dashboard/constructions", icon: BookmarkPlus },
    { title: "Nova Consrtução", href: "/dashboard/new-construction", icon: BookmarkMinus },
  ];

  const stageData = [
    { title: "Estágio", href: "/dashboard/stage", icon: UserPen },
    { title: "Criar Estágio", href: "/dashboard/new-stage", icon: UserPen },
    { title: "Editar Estágio", href: "/dashboard/edit-stage", icon: UserPen },
  ];

  const equipeData = [
    { title: "Profissionais", href: "/dashboard/professionals", icon: Users },
    { title: "Novo Profissional", href: "/dashboard/new-professionals", icon: Users },
    { title: "Equipe", href: "/dashboard/team", icon: Users },
    { title: "Nova Equipe", href: "/dashboard/new-team", icon: Users },
  ];
  
  const contaData = [
    { title: "Profile", href: "/dashboard/profile", icon: UserPen },
  ];
  

export { constructionData, contaData, equipeData, stageData }