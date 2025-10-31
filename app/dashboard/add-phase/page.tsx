'use client';

import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

import type { GetProgressConstrucionsQuery } from '@/app/graphql/generated/graphql';

// --- GraphQL ---
const GET_PROGRESS_CONSTRUCTIONS_QUERY = gql`
  query GetProgressConstrucions {
    constructions {
      id
      name
    }
  }
`;

const graphqlApiUrl =
  process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL || 'http://localhost:3000/graphql';
const graphQLClient = new GraphQLClient(graphqlApiUrl, { credentials: 'include' });

export default function AddPhasePage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  // --- React Query para buscar construções ---
  const { data, isLoading: loadingData, isError, error } = useQuery<GetProgressConstrucionsQuery>({
    queryKey: ['constructions'],
    queryFn: () => graphQLClient.request(GET_PROGRESS_CONSTRUCTIONS_QUERY),
  });

  const constructions = data?.constructions ?? [];

  /**
   * Argument of type 'number' is not assignable to parameter of type 'SetStateAction<string>'.ts(2345)
   */
  useEffect(() => {
    if (constructions.length === 1 && !selectedId) {
      setSelectedId(constructions[0].id);
    }
  }, [constructions, selectedId]);

  // --- Handlers ---
  const handleModelReady = async () => {
    if (!selectedId) {
      alert('Selecione uma construção primeiro.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/phase/template?constructionId=${selectedId}`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Erro ao criar fases do modelo.');

      alert('Fases criadas com sucesso!');
      router.push(`/phases?constructionId=${selectedId}`);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao criar modelo pronto.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelBlank = () => {
    if (!selectedId) {
      alert('Selecione uma construção primeiro.');
      return;
    }
    router.push(`/new-phase/manual?constructionId=${selectedId}`);
  };

  // --- Loading / Error ---
  if (loadingData) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="ml-2 text-gray-600">Carregando construções...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          Erro ao carregar construções: {error instanceof Error ? error.message : 'Erro desconhecido'}
        </p>
      </div>
    );
  }

  if (constructions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="p-8 max-w-md text-center">
          <p className="text-gray-600 mb-4">
            Você precisa criar uma construção antes de adicionar uma fase.
          </p>
          <Button onClick={() => router.push('/new-construction')}>Criar Construção</Button>
        </Card>
      </div>
    );
  }

  // --- Página normal ---
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
      <Card className="max-w-lg w-full shadow-lg rounded-2xl border border-gray-200">
        <CardContent className="p-8 space-y-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Adicionar Fases</h1>

          {constructions.length > 1 && (
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selecione a construção:
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Selecione...</option>
                {constructions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="pt-4 space-y-4">
            <p className="text-gray-700 font-medium">Escolha como deseja iniciar suas fases:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={handleModelReady}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando modelo...
                  </>
                ) : (
                  'Usar Modelo Pronto'
                )}
              </Button>

              <Button
                onClick={handleModelBlank}
                variant="outline"
                className="border-gray-300 text-gray-800 hover:bg-gray-100 w-full sm:w-auto"
              >
                Criar Manualmente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
