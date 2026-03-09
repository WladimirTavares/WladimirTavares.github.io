import { useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockInitiatives, typeOptions, stageOptions } from '../data/mockData';
import { Activity, TrendingUp, Layers, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/card';

export function Dashboard() {
  const stats = useMemo(() => {
    const total = mockInitiatives.length;
    const production = mockInitiatives.filter(i => i.stage === 'producao').length;
    const pilot = mockInitiatives.filter(i => i.stage === 'piloto').length;
    const thisYear = mockInitiatives.filter(i => i.year === 2023).length;

    return { total, production, pilot, thisYear };
  }, []);

  const typeData = useMemo(() => {
    return typeOptions.map(type => ({
      name: type.label,
      value: mockInitiatives.filter(i => i.type === type.value).length,
    })).filter(item => item.value > 0);
  }, []);

  const stageData = useMemo(() => {
    return stageOptions.map(stage => ({
      name: stage.label,
      value: mockInitiatives.filter(i => i.stage === stage.value).length,
    })).filter(item => item.value > 0);
  }, []);

  const yearData = useMemo(() => {
    const years = [2019, 2020, 2021, 2022, 2023];
    return years.map(year => ({
      year: year.toString(),
      iniciativas: mockInitiatives.filter(i => i.year === year).length,
    }));
  }, []);

  const susAreaData = useMemo(() => {
    const areaCount: { [key: string]: number } = {};
    mockInitiatives.forEach(initiative => {
      initiative.susArea.forEach(area => {
        areaCount[area] = (areaCount[area] || 0) + 1;
      });
    });
    return Object.entries(areaCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, []);

  const technologyData = useMemo(() => {
    const techCount: { [key: string]: number } = {};
    mockInitiatives.forEach(initiative => {
      initiative.technology.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1;
      });
    });
    return Object.entries(techCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, []);

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Dashboard de Iniciativas Digitais
        </h2>
        <p className="text-gray-600 mt-1">
          Visão geral e análises de tendências e lacunas no ecossistema de saúde digital do SUS
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Iniciativas</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <Activity className="size-12 text-emerald-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Em Produção</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">{stats.production}</p>
            </div>
            <TrendingUp className="size-12 text-blue-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Projetos Piloto</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">{stats.pilot}</p>
            </div>
            <Layers className="size-12 text-purple-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Iniciativas de 2023</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">{stats.thisYear}</p>
            </div>
            <AlertCircle className="size-12 text-orange-600 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Tipo */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Distribuição por Tipo de Iniciativa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Distribuição por Estágio */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Distribuição por Estágio de Maturidade</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Evolução Temporal */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Evolução de Iniciativas por Ano</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="iniciativas" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Áreas do SUS */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Iniciativas por Área do SUS</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={susAreaData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Tecnologias Mais Usadas */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Top 10 Tecnologias Mais Utilizadas</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={technologyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Insights e Tendências */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="size-5 text-emerald-600" />
            Tendências Identificadas
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-0.5">•</span>
              <span>Crescimento de 150% em iniciativas de IA nos últimos 2 anos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-0.5">•</span>
              <span>Telemedicina consolidada com 75% em produção</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-0.5">•</span>
              <span>Adoção crescente de padrões FHIR e OpenEHR</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="size-5 text-orange-600" />
            Lacunas Identificadas
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">•</span>
              <span>Baixa cobertura em saúde mental digital (8% das iniciativas)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">•</span>
              <span>Poucos projetos de interoperabilidade entre sistemas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">•</span>
              <span>Necessidade de mais wearables para doenças crônicas</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Layers className="size-5 text-blue-600" />
            Oportunidades
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Expansão de IA para diagnóstico em imagens médicas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Integração de chatbots com sistemas de triagem</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Desenvolvimento de prontuários interoperáveis regionais</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
