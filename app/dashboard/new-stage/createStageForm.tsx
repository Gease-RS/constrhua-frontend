'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCurrentUser } from '@/app/hooks/useCurrentUser'; // Seu hook para o usuário atual
import { useRouter } from 'next/navigation'; // Para redirecionar após a criação

// Define o URL da sua API GraphQL
const graphqlApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:3000/graphql';

// Inicializa o cliente GraphQL
const graphQLClient = new GraphQLClient(graphqlApiUrl);

// Define a mutação GraphQL para criar uma etapa
// O nome da mutação (createStage) e o input (CreateStageInput) devem corresponder ao seu schema GraphQL
const CREATE_STAGE_MUTATION = gql`
  mutation CreateStage($createStageInput: CreateStageInput!) {
    createStage(createStageInput: $createStageInput) {
      id
      name
      progress
      construction {
        id
        name
      }
    }
  }
`;

// Define os tipos para as variáveis da mutação e a resposta
interface CreateStageInputVariables {
  name: string;
  progress?: number; // Opcional, pois tem default no Prisma
  constructionId: number;
}

interface CreateStageResponse {
  createStage: {
    id: number;
    name: string;
    progress: number;
    construction: {
      id: number;
      name: string;
    };
  };
}

interface CreateStageFormProps {
  // Se constructionId for passado via props (ex: de um parâmetro de URL)
  initialConstructionId?: number;
}

export function CreateStageForm({ initialConstructionId }: CreateStageFormProps) {
  const { user, isLoading: isUserLoading } = useCurrentUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    progress: 0.0,
    constructionId: initialConstructionId || '', // Pode ser preenchido por prop ou input manual
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  // Função para executar a mutação
  const createStageFn = async (input: CreateStageInputVariables): Promise<CreateStageResponse> => {
    return graphQLClient.request(CREATE_STAGE_MUTATION, {
      createStageInput: input,
    });
  };

  // Hook useMutation do React Query
  const {
    mutate,
    isPending, 
    isError,
    error,
    data,
  } = useMutation<CreateStageResponse, Error, CreateStageInputVariables>({
    mutationFn: createStageFn,
    onSuccess: (data) => {
      alert(`Etapa "${data.createStage.name}" criada com sucesso!`);
      // Invalida a query de todas as construções ou de etapas de uma construção específica
      // para que a lista seja atualizada
      queryClient.invalidateQueries({ queryKey: ['allConstructions'] });
      queryClient.invalidateQueries({ queryKey: ['constructions', data.createStage.construction.id, 'stages'] });

      // Opcional: Redirecionar para a página da construção ou lista de etapas
      router.push(`/dashboard/constructions/${data.createStage.construction.id}`);
    },
    onError: (err) => {
      console.error('Erro ao criar etapa:', err);
      alert(`Erro ao criar etapa: ${err.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUserLoading) {
      alert('Aguarde, carregando informações do usuário.');
      return;
    }

    if (!user?.id) {
      alert('Usuário não autenticado. Por favor, faça login.');
      router.push('/login'); // Redireciona para login se não autenticado
      return;
    }

    // Validação básica do formulário
    if (!formData.name || !formData.constructionId) {
      alert('Por favor, preencha o nome da etapa e o ID da construção.');
      return;
    }

    try {
      mutate({
        name: formData.name,
        progress: formData.progress,
        constructionId: Number(formData.constructionId), // Garante que é um número
      });
    } catch (err) {
      // Erros de mutação são tratados no onError do useMutation
      console.error('Erro inesperado ao disparar mutação:', err);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-xl rounded-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Criar Nova Etapa</h2>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">Nome da Etapa:</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress" className="text-gray-700 font-medium">Progresso (%):</Label>
            <Input
              id="progress"
              name="progress"
              type="number"
              step="0.1" // Permite números decimais
              min="0"
              max="100"
              value={formData.progress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="constructionId" className="text-gray-700 font-medium">ID da Construção:</Label>
            <Input
              id="constructionId"
              name="constructionId"
              type="number"
              value={formData.constructionId}
              onChange={handleChange}
              required
              disabled={!!initialConstructionId} // Desabilita se o ID já veio por prop
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending || isUserLoading} // <-- ALTERADO: de 'isLoading' para 'isPending'
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            {isPending ? 'Criando...' : 'Criar Etapa'} {/* <-- ALTERADO: de 'isLoading' para 'isPending' */}
          </Button>

          {isError && (
            <p className="text-red-600 text-sm mt-2 text-center">
              Erro: {error?.message || 'Ocorreu um erro ao criar a etapa.'}
            </p>
          )}
          {data && (
            <p className="text-green-600 text-sm mt-2 text-center">
              Etapa "{data.createStage.name}" criada com sucesso!
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
