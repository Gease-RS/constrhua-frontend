// app/graphql/hooks.ts
import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query'; // Adicione QueryKey ao import
import {
  CurrentUserQuery,
  CurrentUserQueryVariables,
  CurrentUserDocument,
} from './generated/graphql';
import { graphqlFetcher } from '../common/graphql-fetcher';

type GqlError = unknown; // Seu tipo de erro

export const useCurrentUserQuery = <TData = CurrentUserQuery, TError = GqlError>(
  variables?: CurrentUserQueryVariables,
  // Agora 'options' pode ser o objeto completo de UseQueryOptions,
  // pois não vamos mais passar queryKey e queryFn separadamente.
  options?: UseQueryOptions<CurrentUserQuery, TError, TData, QueryKey> // Remova o Omit aqui
) => {
  const queryKey = variables ? ['CurrentUser', variables] : ['CurrentUser'];

  return useQuery<CurrentUserQuery, TError, TData, QueryKey>({ // OBRIGATÓRIO PASSAR UM OBJETO AQUI
    queryKey: queryKey,
    queryFn: () => graphqlFetcher<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, variables),
    ...options, // Espalha todas as outras opções que vierem no 'options'
  });
};