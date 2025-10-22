// common/graphql-fetcher.ts
import { GraphQLClient } from 'graphql-request';
import { getCookie } from 'cookies-next';
// Importe RequestDocument do graphql-request
import { RequestOptions, Variables, RequestDocument } from 'graphql-request'; // <--- Adicione RequestDocument aqui

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL || 'http://localhost:3001/graphql';
const CSRF_COOKIE_NAME = process.env.NEXT_PUBLIC_CSRF_COOKIE_NAME || 'csrf_token';

export const graphqlFetcher = async <TData, TVariables extends Variables>(
  // Mude o tipo de 'query' para RequestDocument
  query: RequestDocument, // <--- MUDANÇA AQUI
  variables?: TVariables,
  inputRequestHeaders?: HeadersInit
): Promise<TData> => {
  const csrfToken = getCookie(CSRF_COOKIE_NAME);
  const combinedHeaders: Record<string, string> = {};

  // ... (código para combinar headers - omitido para brevidade) ...
  if (inputRequestHeaders) {
    if (inputRequestHeaders instanceof Headers) {
      for (const [key, value] of inputRequestHeaders.entries()) {
        combinedHeaders[key] = value;
      }
    } else if (Array.isArray(inputRequestHeaders)) {
      for (const [key, value] of inputRequestHeaders) {
        if (typeof key === 'string' && typeof value === 'string') {
          combinedHeaders[key] = value;
        }
      }
    } else if (typeof inputRequestHeaders === 'object' && inputRequestHeaders !== null) {
      for (const key in inputRequestHeaders) {
        if (Object.prototype.hasOwnProperty.call(inputRequestHeaders, key)) {
          const value = (inputRequestHeaders as Record<string, string>)[key];
          if (typeof value === 'string') {
            combinedHeaders[key] = value;
          }
        }
      }
    }
  }
  if (csrfToken) {
    combinedHeaders['X-CSRF-Token'] = csrfToken as string;
  }

  const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
    credentials: 'include',
    headers: combinedHeaders,
  });

  const options: RequestOptions<TVariables, TData> = {
    document: query, // Isso agora é compatível
    ...(variables ? { variables: variables } : {}),
  } as RequestOptions<TVariables, TData>;

  return client.request(options);
};