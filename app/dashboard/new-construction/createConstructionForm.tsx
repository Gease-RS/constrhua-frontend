'use client';

import { useState } from 'react';
// Import useMutation from React Query
import { useMutation, useQueryClient } from '@tanstack/react-query';
// Import GraphQLClient and gql from graphql-request
import { GraphQLClient, gql } from 'graphql-request';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCurrentUser } from '@/app/hooks/useCurrentUser'; // Assuming this path is correct

// Define your GraphQL endpoint URL
// Make sure NEXT_PUBLIC_GRAPHQL_API_URL is set in your .env file
const graphqlApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:3000/graphql';

// Initialize GraphQLClient
// It's good practice to create a single instance if possible, or ensure headers are handled
// For cookies, the browser will send them automatically if the request is to the same origin.
// For CSRF, you might need to fetch the token from a cookie and include it in headers if required by your backend.
const graphQLClient = new GraphQLClient(graphqlApiUrl, {
  // Add any common headers here, e.g., for CSRF if needed
  // headers: {
  //   'x-csrf-token': 'your-csrf-token-here', // You'd fetch this from a cookie or context
  // },
});

// Define the GraphQL mutation string using gql from graphql-request
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

// Define the type for the mutation variables
interface CreateConstructionInput {
  name: string;
  address: string;
  cep: string;
  city: string;
  district: string;
  userId: number;
}

// Define the type for the mutation response data
interface CreateConstructionResponse {
  createConstruction: {
    id: string;
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
  const queryClient = useQueryClient(); // Get query client to invalidate queries

  console.log(user, "USER: Construction");

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cep: '',
    city: '',
    district: '',
  });

  // Define the mutation function to be used by React Query's useMutation
  const createConstructionFn = async (input: CreateConstructionInput): Promise<CreateConstructionResponse> => {
    // Use graphQLClient.request to send the mutation
    return graphQLClient.request(CREATE_CONSTRUCTION_MUTATION, {
      createConstructionInput: input,
    });
  };

  // Use React Query's useMutation hook
  const {
    mutate, // This is the function to call to trigger the mutation
    isPending, // Renamed from 'loading' for React Query
    isError,   // React Query's error state
    error,     // The error object
    data,      // The response data
  } = useMutation({
    mutationFn: createConstructionFn,
    onSuccess: () => {
      // Invalidate relevant queries after a successful mutation
      // For example, if you have a query that fetches all constructions
      queryClient.invalidateQueries({ queryKey: ['allConstructions'] });
      alert('Construção criada com sucesso!');
      // Optionally reset the form
      setFormData({
        name: '',
        address: '',
        cep: '',
        city: '',
        district: '',
      });
    },
    onError: (err: Error) => { // Type the error
      console.error('Erro ao criar construção:', err);
      // You can display a more user-friendly error message here
      alert(`Erro ao criar construção: ${err.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      alert('Usuário não autenticado. Por favor, faça login.');
      return;
    }

    try {
      // Call the mutate function from React Query
      mutate({
        ...formData,
        userId: Number(user.id),
      });
      // The alert and form reset are now handled in onSuccess callback
    } catch (err) {
      // Errors are now handled by the onError callback of useMutation
      // This catch block might not be strictly necessary if onError is robust
      console.error('Erro inesperado ao disparar mutação:', err);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-xl rounded-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Nova Construção</h2>

          {['name', 'address', 'cep', 'city', 'district'].map(field => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field} className="capitalize text-gray-700 font-medium">
                {field.replace(/([A-Z])/g, ' $1').trim()}:
              </Label>
              <Input
                id={field}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            {isPending ? 'Criando...' : 'Criar Construção'}
          </Button>

          {isError && (
            <p className="text-red-600 text-sm mt-2 text-center">
              Erro: {error?.message || 'Ocorreu um erro ao criar a construção.'}
            </p>
          )}
          {data && (
            <p className="text-green-600 text-sm mt-2 text-center">
              Construção "{data.createConstruction.name}" criada com sucesso!
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
