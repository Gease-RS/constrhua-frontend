'use client';

import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';
import { Loader2 } from 'lucide-react';

import type { 
    GetProgressConstrucionsQuery,
    Construction as GQLConstruction
} from '@/app/graphql/generated/graphql'; // Ajuste o caminho
import { ProgressChart } from '@/app/components/ProgressChart';

// --- Sua Query GraphQL ---
const GET_PROGRESS_CONSTRUCTIONS_QUERY = gql`
  query GetProgressConstrucions {
    constructions {
      id
      name
      address
      progress 
      
      user {
        id
        username
        fullname
      }
      
      phases {
        id
        name
        progress 
        
        stages {
          id
          name
          progress 
          
          tasks {
            id
            name
            budgetedCost
            status
            startDate
            endDate
          }
        }
      }
      
      teams {
        id
        name
      }
    }
  }
`;

// --- Configuração da API ---
const graphqlApiUrl =
  process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL || 'http://localhost:3000/graphql';
const graphQLClient = new GraphQLClient(graphqlApiUrl);

/**
 * Componente principal que busca todas as construções e renderiza o gráfico de progresso
 * para cada uma.
 */
export const ConstructionProgress: React.FC = () => {
    // Nota: Estou assumindo que a autenticação e o 'enabled' já foram tratados
    // em um contexto superior ou que a API retorna as construções do usuário autenticado.

    const { data, isLoading, isError, error } = useQuery<GetProgressConstrucionsQuery>({
        queryKey: ['progressConstructions'],
        queryFn: () => graphQLClient.request(GET_PROGRESS_CONSTRUCTIONS_QUERY),
        // enabled: ...
    });

    const constructions = data?.constructions ?? [];

    // --- Loading / Erro ---
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="ml-2 text-gray-600">Carregando dados das construções...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6">
                <p className="text-red-500">Erro ao carregar dados: {error instanceof Error ? error.message : 'Erro desconhecido'}</p>
            </div>
        );
    }

    if (constructions.length === 0) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Você não possui construções registradas com progresso.</p>
            </div>
        );
    }

    // --- Renderização dos Gráficos ---
    return (
        <div className="space-y-10">
            <h2 className="text-2xl font-bold border-b pb-2 text-gray-900">
                {constructions.length} Construção(ões) Registrada(s)
            </h2>
            
            {/* Itera sobre cada construção e renderiza um gráfico para ela */}
            {constructions.map((construction) => (
                <ProgressChart 
                    key={construction.id} 
                    construction={construction as any} // *Usamos 'as any' ou o tipo de intersecção definido em ProgressChart
                />
            ))}
        </div>
    );
};