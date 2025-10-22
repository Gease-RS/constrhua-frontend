'use client';

import Link from 'next/link';
import { RoleUser } from '@/app/graphql/generated/graphql'; // Importe o enum RoleUser gerado
import { Button } from '@/components/ui/button'; // Assumindo que você tem um componente Button
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Assumindo componentes de card

// Dados para os cards de tipo de conta
const accountTypes = [
  {
    // Corrigido: Usar RoleUser.Free (PascalCase) conforme gerado pelo GraphQL Code Generator
    role: RoleUser.Free,
    title: 'Gratuito',
    description: 'Acesso básico para começar seu projeto.',
    features: ['1 Projeto', '5 Etapas', 'Suporte Comunitário'],
    price: 'Grátis',
  },
  {
    // Corrigido: Usar RoleUser.Standard (PascalCase)
    role: RoleUser.Standard,
    title: 'Padrão',
    description: 'Recursos essenciais para projetos de médio porte.',
    features: ['5 Projetos', '50 Etapas', 'Suporte Prioritário'],
    price: 'R$ 49/mês',
  },
  {
    // Corrigido: Usar RoleUser.Premium (PascalCase)
    role: RoleUser.Premium,
    title: 'Premium',
    description: 'Funcionalidades avançadas para grandes construções.',
    features: ['Projetos Ilimitados', 'Etapas Ilimitadas', 'Suporte Dedicado'],
    price: 'R$ 99/mês',
  },
  {
    // Corrigido: Usar RoleUser.Enterprise (PascalCase)
    role: RoleUser.Enterprise,
    title: 'Empresarial',
    description: 'Soluções personalizadas para grandes empresas.',
    features: ['Tudo do Premium', 'Consultoria Personalizada', 'SLA Garantido'],
    price: 'Entre em contato',
  },
];

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Escolha seu Plano</h2>
          <p className="mt-2 text-md text-gray-600">
            Selecione o tipo de conta que melhor se adapta às suas necessidades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accountTypes.map((type) => (
            <Card key={type.role} className="flex flex-col justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800">{type.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">{type.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm text-gray-700">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 flex flex-col items-center">
                <p className="text-2xl font-bold text-gray-900 mb-4">{type.price}</p>
                <Link href={`/signup/form?role=${type.role}`} passHref>
                  <Button className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    Escolher {type.title}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-gray-900 hover:text-gray-800">
              Acesse sua conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
