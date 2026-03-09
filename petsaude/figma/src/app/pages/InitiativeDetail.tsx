import { useParams, Link } from 'react-router';
import { mockInitiatives, typeOptions, stageOptions } from '../data/mockData';
import { ArrowLeft, ExternalLink, Calendar, Building2, User, Mail, Tag, Layers, Users, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

export function InitiativeDetail() {
  const { id } = useParams();
  const initiative = mockInitiatives.find(i => i.id === id);

  if (!initiative) {
    return (
      <div className="space-y-6">
        <Link to="/initiatives">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Voltar para busca
          </Button>
        </Link>
        <Card className="p-12 text-center">
          <p className="text-gray-500">Iniciativa não encontrada.</p>
        </Card>
      </div>
    );
  }

  const getTypeBadgeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      telemedicina: 'bg-blue-100 text-blue-800 border-blue-300',
      ia: 'bg-purple-100 text-purple-800 border-purple-300',
      'app-clinico': 'bg-green-100 text-green-800 border-green-300',
      prontuario: 'bg-orange-100 text-orange-800 border-orange-300',
      wearable: 'bg-pink-100 text-pink-800 border-pink-300',
      chatbot: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStageBadgeColor = (stage: string) => {
    const colors: { [key: string]: string } = {
      conceito: 'bg-gray-100 text-gray-800 border-gray-300',
      piloto: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      implementacao: 'bg-blue-100 text-blue-800 border-blue-300',
      producao: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      descontinuado: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[stage] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getTypeLabel = (type: string) => {
    return typeOptions.find(t => t.value === type)?.label || type;
  };

  const getStageLabel = (stage: string) => {
    return stageOptions.find(s => s.value === stage)?.label || stage;
  };

  return (
    <div className="space-y-6">
      <Link to="/initiatives">
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeft className="size-4" />
          Voltar para busca
        </Button>
      </Link>

      <Card className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl font-semibold text-gray-900">
                {initiative.title}
              </h1>
              <div className="flex gap-2">
                <Badge className={getTypeBadgeColor(initiative.type)}>
                  {getTypeLabel(initiative.type)}
                </Badge>
                <Badge className={getStageBadgeColor(initiative.stage)}>
                  {getStageLabel(initiative.stage)}
                </Badge>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {initiative.description}
            </p>
          </div>

          {/* Metadados Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Instituição</p>
                  <p className="font-medium text-gray-900">{initiative.institution}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Responsável</p>
                  <p className="font-medium text-gray-900">{initiative.responsible}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Contato</p>
                  <a
                    href={`mailto:${initiative.contact}`}
                    className="font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    {initiative.contact}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Ano de Início</p>
                  <p className="font-medium text-gray-900">{initiative.year}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Layers className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Estágio de Maturidade</p>
                  <p className="font-medium text-gray-900">{getStageLabel(initiative.stage)}</p>
                </div>
              </div>

              {initiative.url && (
                <div className="flex items-start gap-3">
                  <Globe className="size-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a
                      href={initiative.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      Visitar site
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tecnologias */}
          <div className="pt-6 border-t">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="size-5 text-gray-400" />
              <h3 className="font-semibold text-gray-900">Tecnologias Utilizadas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {initiative.technology.map(tech => (
                <Badge key={tech} variant="outline" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Público-Alvo */}
          <div className="pt-6 border-t">
            <div className="flex items-center gap-2 mb-3">
              <Users className="size-5 text-gray-400" />
              <h3 className="font-semibold text-gray-900">Público-Alvo</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {initiative.target.map(target => (
                <Badge key={target} variant="secondary" className="text-sm">
                  {target}
                </Badge>
              ))}
            </div>
          </div>

          {/* Áreas do SUS */}
          <div className="pt-6 border-t">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="size-5 text-gray-400" />
              <h3 className="font-semibold text-gray-900">Áreas do SUS</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {initiative.susArea.map(area => (
                <Badge key={area} className="bg-emerald-100 text-emerald-800 border-emerald-300 text-sm">
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          {/* Metadados de Registro */}
          <div className="pt-6 border-t text-sm text-gray-500">
            Cadastrado em: {initiative.createdAt.toLocaleDateString('pt-BR')}
          </div>
        </div>
      </Card>

      {/* Iniciativas Relacionadas */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Iniciativas Relacionadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockInitiatives
            .filter(i => i.id !== initiative.id && (
              i.type === initiative.type ||
              i.susArea.some(area => initiative.susArea.includes(area))
            ))
            .slice(0, 4)
            .map(related => (
              <Link key={related.id} to={`/initiatives/${related.id}`}>
                <Card className="p-4 hover:shadow-md transition-shadow h-full">
                  <h4 className="font-medium text-gray-900 mb-2 hover:text-emerald-600">
                    {related.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {related.description}
                  </p>
                  <div className="flex gap-2">
                    <Badge className={getTypeBadgeColor(related.type)} size="sm">
                      {getTypeLabel(related.type)}
                    </Badge>
                    <Badge className={getStageBadgeColor(related.stage)} size="sm">
                      {getStageLabel(related.stage)}
                    </Badge>
                  </div>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
