import React from 'react';
import {
    GetProgressConstrucionsQuery,
    Construction as GQLConstruction,
    Phase as GQLPhase,
    Stage as GQLStage,
    TaskStatus,
} from '@/app/graphql/generated/graphql';

// Definindo o tipo de dado que este gráfico espera (um único objeto Construction com seus aninhamentos)
type ConstructionWithProgress = GQLConstruction & {
    phases: (GQLPhase & {
        stages: (GQLStage & {
            // O Codegen não aninha a tipagem, então precisamos de um tipo local se quisermos detalhar
        })[];
    })[];
};

interface ProgressChartProps {
    construction: ConstructionWithProgress;
}

/**
 * Componente de Apresentação de Gráfico de Progresso Hierárquico.
 */
export const ProgressChart: React.FC<ProgressChartProps> = ({ construction }) => {

    return (
        <div className="border rounded-lg p-4 mb-8 shadow-md bg-white">
            <h3 className="text-xl font-bold mb-4 text-gray-800">{construction.name}</h3>

            {/* Cartão de Progresso Geral */}
            <div className="mb-6 p-3 bg-blue-50 border-l-4 border-blue-500">
                <p className="font-semibold text-lg text-blue-700">Progresso Geral:</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${construction.progress ?? 0}%` }}
                    ></div>
                </div>
                <span className="text-sm text-blue-800 mt-1 block">{construction.progress?.toFixed(1) ?? 0}% Concluído</span>
            </div>

            {/* Detalhe das Fases */}
            <h4 className="text-lg font-semibold mb-3 text-gray-700">Fases (Progresso Detalhado)</h4>

            <div className="space-y-4">
                {/* Itere diretamente sobre as phases da construção, que são tipadas como GQLPhase[] */}
                {(construction.phases || []).map((phase, index) => (
                    <div key={phase.id} className="p-3 border rounded-md">
                        <p className="font-medium text-gray-900">
                            {index + 1}. {phase.name} ({phase.progress?.toFixed(1) ?? 0}%)
                        </p>

                        {/* Barra de Progresso da Fase (Aqui use phase.progress) */}
                        <div className="w-full bg-gray-100 rounded-full h-2 mt-1 mb-2">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${phase.progress ?? 0}%` }}
                            ></div>
                        </div>

                        {/* Lista de Estágios (Stages) */}
                        <ul className="ml-4 mt-2 space-y-1 text-sm text-gray-600">
                            {/* O TypeScript agora sabe que 'phase' tem 'stages' */}
                            {(phase.stages || []).map((stage) => (
                                <li key={stage.id}> {/* **Use stage.id como chave**, pois nomes podem se repetir */}
                                    - {stage.name}: <span className="font-semibold">{stage.progress?.toFixed(1) ?? 0}%</span>
                                    <span className="text-xs text-gray-500"> ({stage.tasks?.length ?? 0} Tarefas)</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};