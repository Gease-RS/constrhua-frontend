// src/components/stages/StageSelectorConstruction.tsx

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

// --- Definições de Tipos (Importante para evitar circular dependency, defina os tipos aqui ou em um arquivo global de tipos) ---
// Se o seu tipo Construction está bem definido, você pode importá-lo. 
// Por simplicidade, vamos defini-lo aqui com as propriedades essenciais.

interface Stage {
  id: string;
  name: string;
  // progress é necessário apenas no gráfico, mas é bom ter uma estrutura completa
}

interface Construction {
  id: string;
  name: string;
  address: string;
  stages: Stage[];
}

// --------------------------------------------------------------------------------

interface StageSelectorConstructionProps {
  constructions: Construction[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const StageSelectorConstruction: React.FC<StageSelectorConstructionProps> = ({ 
  constructions, 
  selectedId, 
  onSelect 
}) => (
  <ScrollArea className="w-full whitespace-nowrap rounded-md border p-4 bg-white shadow-sm">
    <div className="flex space-x-4 pb-2">
      {constructions.map((construction) => (
        <button
          key={construction.id}
          onClick={() => onSelect(construction.id)}
          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors duration-200 min-w-[120px] max-w-[150px]
            ${selectedId === construction.id
              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
              : 'border-gray-200 hover:border-blue-300'
            }`}
        >
          {/* Ícone ou Thumbnail da Obra */}
          <div className="text-2xl mb-1 text-gray-600">🏢</div>
          <span className="text-sm font-medium text-gray-700 truncate w-full">
            {construction.name}
          </span>
          <span className="text-xs text-gray-500">
            {construction.stages.length} Estágios
          </span>
        </button>
      ))}
    </div>
  </ScrollArea>
);