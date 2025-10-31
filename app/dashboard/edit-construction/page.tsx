'use client';

import { useQuery } from '@tanstack/react-query'; // Importa useQuery do React Query
import { GraphQLClient, gql } from 'graphql-request'; // Importa GraphQLClient e gql
import { useCurrentUser } from '@/app/hooks/useCurrentUser'; // Seu hook para o usuário atual

// Importa o tipo da resposta da query de construções
import { GetConstructionsQuery } from '@/app/graphql/generated/graphql';
import { ConstructionTable } from '../constructions/construction-table';

// Define o URL da sua API GraphQL
const graphqlApiUrl = process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL || 'http://localhost:3000/graphql';

// Inicializa o cliente GraphQL
const graphQLClient = new GraphQLClient(graphqlApiUrl, {
  // Você pode adicionar headers aqui, como para CSRF se necessário
  // headers: {
  //   'x-csrf-token': 'seu-csrf-token-aqui', // Obtenha isso de um cookie ou contexto
  // },
});

// Define a query GraphQL para buscar todas as construções
const GET_ALL_CONSTRUCTIONS_QUERY = gql`
  query GetConstructions {
  constructions {
    # Campos da Entidade Construction
    id
    name
    address
    cep
    city
    district
    progress
    createdAt
    updatedAt
    
    # Relação: User (Opcional, mas útil)
    user {
      id
      fullname
      # Adicione outros campos de User que você precise
    }
    
    # Relação: Teams
    teams {
      id
      name
      # Adicione outros campos de Team
    }
    
    # Relação: Phases (A nova hierarquia)
    phases {
      id
      name
      progress # Se a Phase tiver um campo progress
      # Adicione outros campos de Phase
      
      # Relação: Stages (Aninhada dentro de Phase)
      stages {
        id
        name
        # Adicione outros campos de Stage
        
        # Relação: Tasks (Aninhada dentro de Stage)
        tasks {
          id
          name
          status
          # Adicione outros campos de Task
        }
      }
    }
  }
}
`;

// Define o tipo para um item individual de construção (igual ao que usamos na tabela)
type ConstructionItem = GetConstructionsQuery['constructions'][number];

export default function ConstructionEditPage() {
  const { user, isLoading: isUserLoading, isError: isUserError } = useCurrentUser();

  // Função para buscar os dados das construções
  const fetchConstructions = async (): Promise<GetConstructionsQuery> => {
    // O navegador enviará os cookies de sessão automaticamente para o mesmo domínio
    return graphQLClient.request(GET_ALL_CONSTRUCTIONS_QUERY);
  };

  // Usa useQuery para buscar as construções
  const {
    data,
    isLoading: isConstructionsLoading,
    isError: isConstructionsError,
    error: constructionsError,
  } = useQuery<GetConstructionsQuery, Error>({
    queryKey: ['allConstructions'], // Chave única para esta query
    queryFn: fetchConstructions,
    enabled: !!user && !isUserLoading, // A query só será executada se o usuário existir e não estiver carregando
    staleTime: 1000 * 60 * 1, // Dados considerados "stale" após 1 minuto
    gcTime: 1000 * 60 * 5, // Cache será coletado após 5 minutos
  });

  // --- Validações e Estados de Carregamento/Erro ---

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700">Carregando informações do usuário...</p>
      </div>
    );
  }

  if (isUserError || !user) {
    // O DashboardLayout já deve redirecionar para o login, mas é uma boa prática ter uma fallback
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Erro de autenticação ou usuário não encontrado. Por favor, faça login novamente.</p>
      </div>
    );
  }

  if (isConstructionsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700">Carregando lista de obras...</p>
      </div>
    );
  }

  if (isConstructionsError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Erro ao carregar obras: {constructionsError?.message}</p>
      </div>
    );
  }

  // Se tudo carregou e não houve erros, renderiza a tabela
  // Certifique-se de que 'data.constructions' é o array correto de construções
  const constructions: ConstructionItem[] = data?.constructions || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Minhas Construções</h1>
      <ConstructionTable constructions={constructions} />
    </div>
  );
}
