"use client";

import { useCurrentUser } from "../hooks/useCurrentUser";

function CurrentUserDisplay() {
  // MUDANÇA AQUI: Acesse 'user' diretamente, não 'data'
  const { user, isLoading, isError, error } = useCurrentUser();

  if (isLoading) {
    return <p>Carregando usuário...</p>;
  }

  if (isError) {
    console.error("Erro ao carregar usuário:", error);
    return <p>Erro: {error instanceof Error ? error.message : 'Um erro desconhecido ocorreu.'}</p>;
  }

  // MUDANÇA AQUI: Verifique 'user' diretamente
  if (!user) { // Removido 'data || !data.currentUser'
    return <p>Nenhum usuário encontrado.</p>;
  }

  // Acesso seguro aos dados graças à tipagem gerada
  // 'currentUser' já é 'user' aqui, então não precisa de desestruturação extra
  // const { currentUser } = data; // Removido

  return (
    <div>
      <h2>Usuário Logado:</h2>
      <p>ID: {user.id}</p> {/* Use 'user' diretamente */}
      <p>Email: {user.email}</p> {/* Use 'user' diretamente */}
      <p>Nome Completo: {user.fullname}</p> {/* Use 'user' diretamente */}
      <p>Função: {user.role}</p> {/* Use 'user' diretamente */}
      <p>Ativo: {user.isActive ? 'Sim' : 'Não'}</p> {/* Use 'user' diretamente */}
    </div>
  );
}

export default CurrentUserDisplay;
