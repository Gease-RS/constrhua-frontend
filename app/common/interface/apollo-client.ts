// src/lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
//import { cacheExchange, createClient as createUrqlClient, fetchExchange } from '@urql/core'; // Se você for usar Urql, mas mantenha Apollo por enquanto

// Definindo os nomes dos cookies (deve ser consistente com seu backend NestJS)
const ACCESS_PAYLOAD_COOKIE_NAME = 'access_payload';
const CSRF_TOKEN_COOKIE_NAME = 'csrf_token';

// Para garantir que o cliente seja singleton em ambientes de desenvolvimento
// e seja recriado para cada requisição no Server Components.
// Usaremos uma função simples para obter o cliente.
let client: ApolloClient<any> | null = null;

function createApolloClient() {
  // 1. Configuração do HttpLink
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3001/graphql',
    // fetchOptions: { cache: 'no-store' }, // Opcional: para garantir que as requisições não sejam cacheadas pelo navegador
  });

  // 2. AuthLink: Anexa o access_payload e csrf_token dos cookies aos headers da requisição
  const authLink = setContext((_, { headers }) => {
    // No Client Component, 'document.cookie' é acessível.
    // Em Server Components, você precisaria usar 'cookies()' do 'next/headers'.
    // Este cliente será usado principalmente em Client Components para requisições do frontend.
    const cookies = typeof document !== 'undefined' ? document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {} as Record<string, string>) : {}; // Retorna objeto vazio se não estiver no navegador

    const accessPayload = cookies[ACCESS_PAYLOAD_COOKIE_NAME];
    const csrfToken = cookies[CSRF_TOKEN_COOKIE_NAME];

    return {
      headers: {
        ...headers,
        'X-Access-Payload': accessPayload || '',
        'X-CSRF-Token': csrfToken || '',
      },
    };
  });

  // 3. ErrorLink: Tratamento de erros GraphQL e de rede
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError.message}`);
      // Lógica de redirecionamento ou tratamento de Unauthorized deve ser feita em Client Components.
    }
  });

  const link = ApolloLink.from([errorLink, authLink, httpLink]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
    // ssrMode: typeof window === 'undefined', // Este modo é para o cenário de Server Components com dados iniciais.
                                            // Para a maioria dos casos de Client Components com cookies,
                                            // você não precisa disso aqui.
  });
}

// Função para obter o cliente Apollo
// Garante que o cliente é um singleton no Client Side e pode ser reusado.
export function getClient(): ApolloClient<any> {
  // Em um ambiente de navegador, cria uma única instância
  if (typeof window !== 'undefined') {
    if (!client) {
      client = createApolloClient();
    }
    return client;
  }
  // Em um ambiente de servidor (SSR), cria uma nova instância para cada requisição
  // para evitar vazamento de dados entre requisições.
  return createApolloClient();
}