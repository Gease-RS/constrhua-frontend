import { Stage } from "@/app/graphql/generated/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StagesChartProps {
  stages: Stage[];
  constructionName: string;
}

export const StagesChart: React.FC<StagesChartProps> = ({ stages, constructionName }) => {
  // Dados transformados para o gráfico (nome e progresso)
  const chartData = stages.map(stage => ({
    name: stage.name,
    Progresso: stage.progress, // Chave do dado no BarChart
  }));

  if (stages.length === 0) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Progresso de Estágios - {constructionName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Nenhum estágio encontrado para esta construção.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Progresso de Estágios - {constructionName}</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            layout="vertical" // Gráfico de barras vertical
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" domain={[0, 100]} stroke="#6b7280" /> {/* Eixo X para Progresso (0-100) */}
            <YAxis dataKey="name" type="category" stroke="#6b7280" /> {/* Eixo Y para os nomes dos Estágios */}
            <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Progresso']}
                labelFormatter={(label) => `Estágio: ${label}`}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="Progresso" fill="#3b82f6" name="Progresso (%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};