'use client'; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '../hooks/useCurrentUser';

export default function DashboardPage() {
  const { user, isLoading, isError } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    // Se ainda está carregando, não faça nada. Mostre um loader.
    if (isLoading) {
      return;
    }

    // Se não há usuário (não autenticado) OU se houve um erro na requisição (e não está carregando),
    // redirecione para a página de login.
    // O 'isError' pega casos como token inválido, sessão expirada, etc.
    if (!user && !isLoading) { // Certifica-se que não está mais carregando
      console.log('Usuário não autenticado ou sessão inválida. Redirecionando para /login...');
      router.push('/login');
    }
  }, [user, isLoading, router]); // Dependências do useEffect

  // Opcional: Mostrar um loader enquanto a autenticação está sendo verificada
  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Verificando autenticação...</p>
        {/* Adicione um spinner ou ícone de carregamento aqui */}
      </div>
    );
  }

  // Se não há usuário (redirecionamento já foi acionado pelo useEffect),
  // ou se houver erro (também redirecionado), você pode retornar null ou um loader.
  // Evita renderizar o conteúdo da página se o redirecionamento estiver pendente.
  if (!user || isError) {
    return null; // Ou um loader/componente vazio
  }

  // Se chegou até aqui, o usuário está autenticado e os dados estão disponíveis
  return (
    <div style={{ padding: '20px' }}>
      <h1>Bem-vindo ao Dashboard, {user.username}!</h1>
      <p>Este é o conteúdo protegido.</p>
      {/* Exiba outros dados do usuário ou conteúdo da dashboard */}
    </div>
  );
}