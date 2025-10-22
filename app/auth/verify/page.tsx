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

    // A chamada fetch para o endpoint REST /auth/verify permanece a mesma
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, email }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ message: 'Erro desconhecido na verificação.' }));
          throw new Error(errorData.message || 'Erro na verificação');
        }
        const data = await res.json();
        console.log('✅ Usuário autenticado:', data.user);

        // --- MUDANÇA IMPORTANTE AQUI ---
        // Invalida o cache da query 'CurrentUser' do React Query.
        // Isso forçará o useCurrentUserQuery a buscar novos dados na próxima vez que for chamado.
        await queryClient.invalidateQueries({ queryKey: ['CurrentUser'] });
        // --- Fim da mudança ---

        setMessage('Verificação bem-sucedida! Redirecionando...');
        setIsError(false);
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('❌ Erro na verificação:', error.message);
        setMessage(`Erro na verificação: ${error.message}. Redirecionando para o login...`);
        setIsError(true);
        setTimeout(() => router.push('/login'), 3000);
      });
  }, [router, queryClient]); // Adicione 'queryClient' como uma dependência do useEffect

  return (
    <div className="p-8 text-center">
      <p className={`text-xl font-semibold ${isError ? 'text-red-600' : 'text-gray-800'}`}>
        {message}
      </p>
    </div>
  );
}