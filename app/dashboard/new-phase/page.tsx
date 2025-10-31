'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// URL da API (ajuste se necessário)
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL || 'http://localhost:3000/graphql';
const apiRestUrl = process.env.NEXT_PUBLIC_BACKEND_REST_URL || 'http://localhost:3000';

export default function NewPhasePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const constructionId = searchParams.get('constructionId');
  const [isLoading, setIsLoading] = useState(false);

  const handleModelReady = async () => {
    if (!constructionId) {
      alert('ID da construção não encontrado.');
      return;
    }

    try {
      setIsLoading(true);
      // Chama o endpoint do backend responsável por criar as fases a partir do modelo seed
      const response = await fetch(`${apiRestUrl}/phase/template?constructionId=${constructionId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Erro ao criar fases do modelo.');
      }

      alert('Fases criadas com sucesso!');
      router.push(`/phases?constructionId=${constructionId}`);
    } catch (error: any) {
      console.error('Erro ao criar modelo pronto:', error);
      alert(error.message || 'Erro ao criar modelo pronto.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelBlank = () => {
    if (!constructionId) {
      alert('ID da construção não encontrado.');
      return;
    }
    router.push(`/new-phase/manual?constructionId=${constructionId}`);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
      <Card className="max-w-lg w-full shadow-lg rounded-2xl border border-gray-200">
        <CardContent className="p-8 space-y-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Nova Construção Criada!</h1>

          <p className="text-gray-600 leading-relaxed">
            Agora que você criou sua nova construção, é hora de adicionar as <strong>Fases</strong> do seu projeto.
            <br />
            As fases representam as etapas principais do processo de construção, como:
          </p>

          <ul className="text-left text-gray-600 list-disc list-inside space-y-1">
            <li>Projeto e Fundação</li>
            <li>Planejamento e Projeto</li>
            <li>Serviços Preliminares</li>
            <li>Estrutura (Fundação e Alvenaria)</li>
            <li>Instalações e Cobertura</li>
          </ul>

          <div className="pt-4 space-y-4">
            <p className="text-gray-700 font-medium">
              Escolha como deseja iniciar suas fases:
            </p>

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
