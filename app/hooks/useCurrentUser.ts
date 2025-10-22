'use client';

import { useQueryClient, useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query'; // Importe useQuery
import { useRouter } from 'next/navigation'; // Importe useRouter
import {
  // Remova a importação de useCurrentUserQuery, pois não será mais usado
  CurrentUserQuery, // Tipo da query
  CurrentUserQueryVariables, // Tipo das variáveis (pode ser Exact<{}>)
  CurrentUserDocument, // <--- Importe o Documento GraphQL gerado
} from '@/app/graphql/generated/graphql'; // Ajuste o caminho conforme necessário
import { graphqlFetcher } from '../common/graphql-fetcher';


// Defina o tipo do erro (pode ser mais específico se tiver um tipo de erro GraphQL)
type GqlError = Error; // Ou um tipo de erro mais detalhado

/**
 * Hook personalizado para gerenciar o usuário atual.
 * Utiliza useQuery do React Query diretamente para buscar os dados do usuário.
 */
export const useCurrentUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Defina a chave da query
  const queryKey: QueryKey = ['CurrentUser'];

  // Defina a função que fará a requisição (queryFn)
  const queryFn = async () => {
    // Chama seu graphqlFetcher com o Documento da Query e variáveis (vazio para CurrentUser)
    return graphqlFetcher<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, {});
  };

  // Chame o hook useQuery do React Query diretamente
  const {
    data,
    isLoading, // Estado de carregamento do React Query
    isError,
    error,
    refetch, // Inclui a função de refetch do React Query
  } = useQuery<CurrentUserQuery, GqlError, CurrentUserQuery, QueryKey>({
    queryKey, // Passa a chave da query
    queryFn,   // Passa a função que faz a requisição
    // Opções do React Query
    staleTime: 1000 * 60 * 5, // Exemplo: dados considerados "stale" após 5 minutos
    gcTime: 1000 * 60 * 10, // Renomeado de 'cacheTime' para 'gcTime'
    retry: 1, // Tenta novamente 1 vez em caso de falha
  });

  // Função de logout
  const logout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        // Invalida o cache da query 'CurrentUser' para limpar os dados do usuário
        await queryClient.invalidateQueries({ queryKey: ['CurrentUser'] });
        // Opcional: Remove todos os caches do React Query se for um logout completo
        // await queryClient.clear();
        router.push('/login'); // Redireciona para a página de login
      } else {
        const errorData = await res.json();
        console.error('Erro ao fazer logout:', errorData);
        // Lidar com erros de logout, talvez exibir uma mensagem ao usuário
      }
    } catch (error) {
      console.error('Erro de rede ao fazer logout:', error);
    }
  };

  return {
    user: data?.currentUser || null, // Retorna null se não houver dados ou usuário
    isLoading, // Estado de carregamento do React Query
    isError, // Estado de erro do React Query
    error, // Objeto de erro
    refetch, // Função para refetch manual
    logout, // Função de logout
  };
};
