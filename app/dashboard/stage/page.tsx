'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';
import { Loader2 } from 'lucide-react';
import { StageSelectorConstruction } from './stageSelectorConstrution';
import { StagesChart } from './stageChart';

import type {
  Construction as GQLConstruction,
  Stage as GQLStage,
  Phase as GQLPhase, // Adicione o tipo Phase
} from '@/app/graphql/generated/graphql';

// --- Tipagem para o seletor (compatível com o componente) ---
interface SelectorConstruction {
  id: string;
  name: string;
  address?: string;
  // O seletor agora carrega PHASES, não STAGES diretamente
  phases: GQLPhase[];
}

// --- Tipagem do retorno da query ---
interface GetAllConstructionsQuery {
  constructions: GQLConstruction[];
}

interface SelectorConstruction {
  id: string;
  name: string;
  address?: string;
  phases: GQLPhase[];
}

// --- GraphQL ---
const graphqlApiUrl =
  process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL || 'http://localhost:3000/graphql';
const graphQLClient = new GraphQLClient(graphqlApiUrl);

const GET_ALL_CONSTRUCTIONS_QUERY = gql`
  qquery GetConstructions {
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

export default function StagesPage() {
  const { user, isLoading: isUserLoading } = useCurrentUser();
  const [selectedConstructionId, setSelectedConstructionId] = useState<string | null>(null);


  // --- Query: buscar construções ---
  const { data, isLoading, isError, error } = useQuery<GetAllConstructionsQuery>({
    queryKey: ['allConstructionsWithStages'],
    queryFn: () => graphQLClient.request(GET_ALL_CONSTRUCTIONS_QUERY),
    enabled: !!user && !isUserLoading,
  });

  const constructions: GQLConstruction[] = data?.constructions ?? [];

  // --- Array para o selector (compatível com o componente) ---
  const selectorConstructions: SelectorConstruction[] = useMemo(() => {
    return constructions.map((c) => ({
      id: String(c.id),
      name: c.name,
      address: c.address ?? '',
      // ATUALIZADO: Usar 'phases' em vez do inexistente 'stages'
      phases: c.phases || [],
    }));
  }, [constructions]);

  // --- SelectedId efetivo ---
  const effectiveSelectedId =
    selectedConstructionId ?? selectorConstructions[0]?.id ?? null;

  // --- SelectedConstruction real (tipos do GraphQL) ---
  const selectedConstruction: GQLConstruction | null = useMemo(() => {
    if (!effectiveSelectedId) return null;
    return constructions.find((c) => String(c.id) === effectiveSelectedId) ?? null;
  }, [constructions, effectiveSelectedId]);

  const allStagesFromSelectedConstruction: GQLStage[] = useMemo(() => {
    if (!selectedConstruction) return [];

    // Mapeia todas as phases e achata os stages em um único array
    return (selectedConstruction.phases || [])
      .flatMap((phase) => phase.stages || [])
      // O flatMap garante que, se stages for null/undefined, ele é ignorado
      .filter((stage): stage is GQLStage => !!stage); // Filtra por segurança
  }, [selectedConstruction]);

  // --- Loading / Erro ---
  if (isUserLoading || isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Carregando dados da obra...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-500">Erro ao carregar obras: {error?.message}</p>
      </div>
    );
  }

  if (constructions.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Estágios de sua Construção</h1>
        <p className="text-gray-500">Você ainda não possui nenhuma construção cadastrada.</p>
      </div>
    );
  }

  // --- Renderização principal ---
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Acompanhamento de Estágios</h1>

      {/* Seletor de Construção */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Selecione uma Obra:</h2>
        {/* Você deve verificar se o StageSelectorConstruction aceita o novo tipo */}
        {/* Se o StageSelectorConstruction não precisar de 'stages', o cast 'as any' ou a refatoração dele é necessária */}
        <StageSelectorConstruction
          constructions={selectorConstructions as any} // *Pode precisar de refatoração no StageSelectorConstruction*
          selectedId={effectiveSelectedId}
          onSelect={setSelectedConstructionId}
        />
      </div>

      {/* Gráfico de Estágios */}
      {selectedConstruction ? (
        <StagesChart
          // ATUALIZADO: Passa o array achatado de stages
          stages={allStagesFromSelectedConstruction}
          constructionName={selectedConstruction.name}
        />
      ) : (
        <p className="mt-6 text-gray-500 text-center">
          Selecione uma construção acima para ver os estágios.
        </p>
      )}
    </div>
  );
}
