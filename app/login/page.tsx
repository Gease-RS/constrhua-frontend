'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query'; // <-- Importe useMutation do React Query
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


// Assumindo que você gerará esta mutação com o codegen no futuro
// Por enquanto, vamos usar a string literal da query
import { Exact, SendAuthCodeMutation, SendAuthCodeMutationVariables } from '@/app/graphql/generated/graphql';
import { gql } from 'graphql-request';
import { graphqlFetcher } from '../common/graphql-fetcher';
import Navbar from '../components/sections/navbar';

// Define a mutação GraphQL como um DocumentNode para uso com graphql-request
const SEND_AUTH_CODE_MUTATION_DOCUMENT = gql`
  mutation SendAuthCode($email: String!) {
    sendAuthCode(input: { email: $email })
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para exibir mensagens de erro

  // Use o hook useMutation do React Query
  // Os genéricos são: <Retorno da mutação, Tipo do Erro, Tipo das Variáveis>
  const { mutate, isPending } = useMutation<
    SendAuthCodeMutation,
    Error, // Tipo de erro. Pode ser mais específico se você tiver um tipo de erro GraphQL
    SendAuthCodeMutationVariables
  >({
    mutationFn: async (variables) => {
      // Use seu graphqlFetcher para executar a mutação
      return graphqlFetcher<SendAuthCodeMutation, SendAuthCodeMutationVariables>(
        SEND_AUTH_CODE_MUTATION_DOCUMENT,
        variables
      );
    },
    onSuccess: (data) => {
      if (data?.sendAuthCode) {
        setSuccess(true);
        setErrorMessage(''); // Limpa qualquer erro anterior
      } else {
        setSuccess(false);
        setErrorMessage('Ocorreu um erro ao enviar o código. Tente novamente.');
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
      setSuccess(false);
      setErrorMessage(error.message || 'Erro desconhecido ao enviar o código.');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Limpa a mensagem de erro antes de uma nova tentativa
    setSuccess(false); // Reinicia o estado de sucesso

    // Chame a função mutate do React Query
    mutate({ email });
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Acesse sua conta</h2>
              <p className="mt-2 text-sm text-gray-600">
                Enviaremos um link de autenticação para seu e-mail
              </p>
            </div>

            {/* Exibe mensagem de erro se houver */}
            {errorMessage && (
              <div className="mt-6 rounded-md bg-red-50 p-4">
                <p className="text-center text-sm font-medium text-red-800">
                  {errorMessage}
                </p>
              </div>
            )}

            {success ? (
              <div className="mt-6 rounded-md bg-green-50 p-4">
                <p className="text-center text-sm font-medium text-green-800">
                  Código de autenticação enviado com sucesso para {email}
                </p>
                <p className="mt-2 text-center text-xs text-green-600">
                  Verifique sua caixa de entrada e clique no link para acessar
                </p>
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    {isPending ? (
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
                        Enviando...
                      </span>
                    ) : (
                      'Enviar link de acesso'
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                Não tem uma conta?{' '}
                <Link
                  href="/signup"
                  className="font-medium text-gray-900 hover:text-gray-800"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}