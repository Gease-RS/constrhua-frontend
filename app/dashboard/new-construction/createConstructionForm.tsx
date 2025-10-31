'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';

const graphqlApiUrl =
  process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL || 'http://localhost:3000/graphql';

const graphQLClient = new GraphQLClient(graphqlApiUrl);

const CREATE_CONSTRUCTION_MUTATION = gql`
  mutation CreateConstruction($createConstructionInput: CreateConstructionInput!) {
    createConstruction(createConstructionInput: $createConstructionInput) {
      id
      name
      address
      city
      district
      user {
        id
        username
      }
    }
  }
`;

interface CreateConstructionInput {
  name: string;
  address: string;
  cep: string;
  city: string;
  district: string;
  userId: number;
}

interface CreateConstructionResponse {
  createConstruction: {
    id: string | number;
    name: string;
    address: string;
    city: string;
    district: string;
    user: {
      id: string;
      username: string;
    };
  };
}

export function CreateConstructionForm() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cep: '',
    city: '',
    district: '',
  });

  const createConstructionFn = async (
    input: CreateConstructionInput
  ): Promise<CreateConstructionResponse> => {
    return graphQLClient.request(CREATE_CONSTRUCTION_MUTATION, {
      createConstructionInput: input,
    });
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createConstructionFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['allConstructions'] });

      const created = response.createConstruction;
      alert(`Construção "${created.name}" criada com sucesso!`);

      // ✅ Redireciona para a nova rota dinâmica
      router.push(`/dashboard/new-phase/${Number(created.id)}`);

      // (opcional) Reset do formulário
      setFormData({
        name: '',
        address: '',
        cep: '',
        city: '',
        district: '',
      });
    },
    onError: (err: Error) => {
      console.error('Erro ao criar construção:', err);
      alert(`Erro ao criar construção: ${err.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      alert('Usuário não autenticado. Por favor, faça login.');
      return;
    }
    mutate({
      ...formData,
      userId: Number(user.id),
    });
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-xl rounded-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Nova Construção</h2>

          {['name', 'address', 'cep', 'city', 'district'].map((field) => (
            <div key={field} className="space-y-2">
              <Label
                htmlFor={field}
                className="capitalize text-gray-700 font-medium"
              >
                {field.replace(/([A-Z])/g, ' $1').trim()}:
              </Label>
              <Input
                id={field}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Criando...' : 'Criar Construção'}
          </Button>

          {isError && (
            <p className="text-red-600 text-sm mt-2 text-center">
              Erro: {error?.message || 'Ocorreu um erro ao criar a construção.'}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
