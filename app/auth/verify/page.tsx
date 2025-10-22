'use client'; // Este componente é um Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query'; 

export default function VerifyPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Verificando código...');
  const [isError, setIsError] = useState(false);
  const queryClient = useQueryClient(); // <-- Inicialize o cliente do React Query aqui

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const email = params.get('email');

    if (!code || !email) {
      setMessage('Erro: Código ou e-mail não fornecidos.');
      setIsError(true);
      setTimeout(() => router.push('/login'), 2000);
      return;
    }

    // 1. Declare a URL e logue ANTES de chamar fetch
    const fetchURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`;
    console.log('🔗 Tentando verificar o código em:', fetchURL);

    // 2. A chamada fetch para o endpoint REST /auth/verify, agora com sintaxe correta
    fetch(fetchURL, { // <--- URL como 1º argumento, Objeto de Configuração como 2º
      method: 'POST', // É importante garantir que o método POST esteja explícito
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, email }),
    })
      .then(async (res) => {
        if (!res.ok) {
          // Tenta parsear o corpo do erro. O catch() impede que o erro 'Unexpected token <'
          // pare completamente a aplicação, mas ainda registra a mensagem de erro.
          const errorData = await res.json().catch(() => ({ message: 'Erro desconhecido na verificação (sem JSON).' }));
          throw new Error(errorData.message || 'Erro na verificação');
        }
        const data = await res.json();
        console.log('✅ Usuário autenticado:', data.user);

        // Invalida o cache da query 'CurrentUser' do React Query.
        await queryClient.invalidateQueries({ queryKey: ['CurrentUser'] });

        setMessage('Verificação bem-sucedida! Redirecionando...');
        setIsError(false);
        router.push('/dashboard');
      })
      .catch((error) => {
        // O erro do "Unexpected token <" será exibido aqui,
        // mas agora você tem certeza de que a URL está correta.
        console.error('❌ Erro na verificação:', error.message);
        setMessage(`Erro na verificação: ${error.message}. Redirecionando para o login...`);
        setIsError(true);
        setTimeout(() => router.push('/login'), 3000);
      });
  }, [router, queryClient]); // Dependências do useEffect
  
  return (
    <div className="p-8 text-center">
      <p className={`text-xl font-semibold ${isError ? 'text-red-600' : 'text-gray-800'}`}>
        {message}
      </p>
    </div>
  );
}