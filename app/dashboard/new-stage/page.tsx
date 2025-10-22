'use client';

import { useParams } from 'next/navigation';
import { CreateStageForm } from './createStageForm';

export default function CreateStagePage() {
  const params = useParams();
  const constructionId = params.constructionId ? Number(params.constructionId) : undefined;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Criar Nova Etapa para Construção {constructionId}</h1>
      <CreateStageForm initialConstructionId={constructionId} />
    </div>
  );
}