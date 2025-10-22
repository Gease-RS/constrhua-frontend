'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query'; // Importe useMutation
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Importe os tipos gerados para a mutação e o enum RoleUser
import {
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateUserDocument, // O DocumentNode gerado
  RoleUser, // O enum RoleUser gerado
} from '@/app/graphql/generated/graphql';
import { graphqlFetcher } from '@/app/common/graphql-fetcher';


export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedRole = searchParams.get('role') as RoleUser | null;

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Redireciona se a role não for válida ou não estiver presente
  useEffect(() => {
    if (!selectedRole || !Object.values(RoleUser).includes(selectedRole)) {
      router.push('/signup'); // Redireciona de volta para a seleção de plano
    }
  }, [selectedRole, router]);

  // Use o hook useMutation do React Query para a mutação createUser
  // MUDANÇA AQUI: use 'isPending' em vez de 'isLoading'
  const { mutate, isPending } = useMutation< // <--- Corrigido para 'isPending'
    CreateUserMutation,
    Error, // Tipo de erro. Pode ser mais específico se o backend retornar erros GraphQL
    CreateUserMutationVariables
  >({
    mutationFn: async (variables) => {
      // Chama seu graphqlFetcher com o DocumentNode da mutação e as variáveis
      return graphqlFetcher<CreateUserMutation, CreateUserMutationVariables>(
        CreateUserDocument,
        variables
      );
    },
    onSuccess: (data) => {
      if (data?.createUser) {
        setSuccessMessage('Conta criada com sucesso! Redirecionando para o login...');
        setErrorMessage('');
        setTimeout(() => router.push('/login'), 2000); // Redireciona para o login após o registro
      } else {
        setErrorMessage('Erro desconhecido ao criar a conta.');
      }
    },
    onError: (error) => {
      console.error('Erro de registro:', error);
      setErrorMessage(error.message || 'Erro ao criar a conta. Tente novamente.');
      setSuccessMessage('');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!selectedRole) {
      setErrorMessage('Tipo de conta não selecionado. Por favor, volte e selecione um plano.');
      return;
    }

    // Chama a função mutate do React Query
    mutate({
      input: {
        fullname,
        username,
        email,
        role: selectedRole, // A role já vem preenchida
      },
    });
  };

  // Não renderiza o formulário se a role não for válida ainda
  if (!selectedRole || !Object.values(RoleUser).includes(selectedRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <p className="text-xl font-semibold text-gray-800">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Crie sua Conta {selectedRole}</h2>
            <p className="mt-2 text-sm text-gray-600">
              Preencha os detalhes abaixo para criar sua conta {selectedRole}.
            </p>
          </div>

          {errorMessage && (
            <div className="mt-6 rounded-md bg-red-50 p-4">
              <p className="text-center text-sm font-medium text-red-800">
                {errorMessage}
              </p>
            </div>
          )}
          {successMessage && (
            <div className="mt-6 rounded-md bg-green-50 p-4">
              <p className="text-center text-sm font-medium text-green-800">
                {successMessage}
              </p>
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                required
                placeholder="Seu Nome Completo"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
            </div>

            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nome de Usuário
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                placeholder="seu_usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
            </div>

            <div>
              <Label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Tipo de Conta
              </Label>
              <Input
                id="role"
                name="role"
                type="text"
                value={selectedRole || ''}
                readOnly // Campo somente leitura
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isPending} // <--- Use 'isPending' aqui
                className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {isPending ? ( // <--- Use 'isPending' aqui
                  <span className="flex items-center justify-center">
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Registrando...
                  </span>
                ) : (
                  'Criar Conta'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Voltar para{' '}
              <Link
                href="/signup"
                className="font-medium text-gray-900 hover:text-gray-800"
              >
                Escolher Plano
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
