'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  GetAllConstructionsQuery, // Importa o tipo da resposta completa da query
} from '@/app/graphql/generated/graphql'; // Caminho para seus tipos GraphQL gerados

// Define o tipo para um item individual de construção.
// Baseado na sua definição de GetAllConstructionsQuery:
// export type GetAllConstructionsQuery = { __typename?: 'Query', constructions: Array<{ ... }> };
// A lista de construções está na propriedade 'constructions'.
type ConstructionItem = GetAllConstructionsQuery['constructions'][number];

interface ConstructionTableProps {
  // A prop 'constructions' agora é tipada corretamente como um array de ConstructionItem
  constructions: ConstructionItem[];
}

export function ConstructionTable({ constructions }: ConstructionTableProps) {
  return (
    <div className="p-4 rounded-xl shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Lista de Obras</h2>
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CEP</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {constructions.map((construction) => (
            <TableRow key={construction.id} className="hover:bg-gray-50">
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{construction.name}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{construction.address}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{construction.city}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{construction.cep}</TableCell>
              {/* Acessando user.email agora está corretamente tipado porque 'user' é parte de ConstructionItem */}
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{construction.user?.email ?? 'N/A'}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-800 border-blue-600 hover:border-blue-800 transition-colors duration-200 ease-in-out">Ver</Button>
                <Button variant="ghost" size="sm" className="ml-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 ease-in-out">Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {constructions.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Nenhuma obra encontrada.</p>
      )}
    </div>
  );
}
