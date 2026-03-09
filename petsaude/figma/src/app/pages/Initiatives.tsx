import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { mockInitiatives, typeOptions, stageOptions, susAreaOptions } from '../data/mockData';
import { Search, Filter, ExternalLink, Calendar, Building2, User } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function Initiatives() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedSusArea, setSelectedSusArea] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredInitiatives = useMemo(() => {
    return mockInitiatives.filter(initiative => {
      const matchesSearch = searchTerm === '' ||
        initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        initiative.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        initiative.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        initiative.technology.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = selectedType === 'all' || initiative.type === selectedType;
      const matchesStage = selectedStage === 'all' || initiative.stage === selectedStage;
      const matchesSusArea = selectedSusArea === 'all' || initiative.susArea.includes(selectedSusArea);

      return matchesSearch && matchesType && matchesStage && matchesSusArea;
    });
  }, [searchTerm, selectedType, selectedStage, selectedSusArea]);

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
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Buscar Iniciativas Digitais
        </h2>
        <p className="text-gray-600 mt-1">
          {filteredInitiatives.length} iniciativa{filteredInitiatives.length !== 1 ? 's' : ''} encontrada{filteredInitiatives.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Barra de Busca e Filtros */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por título, descrição, instituição ou tecnologia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="size-4" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tipo de Iniciativa
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {typeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Estágio de Maturidade
                </label>
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os estágios</SelectItem>
                    {stageOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Área do SUS
                </label>
                <Select value={selectedSusArea} onValueChange={setSelectedSusArea}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as áreas</SelectItem>
                    {susAreaOptions.map(area => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {(selectedType !== 'all' || selectedStage !== 'all' || selectedSusArea !== 'all') && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-sm text-gray-600">Filtros ativos:</span>
              {selectedType !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {getTypeLabel(selectedType)}
                  <button
                    onClick={() => setSelectedType('all')}
                    className="ml-1 hover:text-gray-900"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedStage !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {getStageLabel(selectedStage)}
                  <button
                    onClick={() => setSelectedStage('all')}
                    className="ml-1 hover:text-gray-900"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedSusArea !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedSusArea}
                  <button
                    onClick={() => setSelectedSusArea('all')}
                    className="ml-1 hover:text-gray-900"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedType('all');
                  setSelectedStage('all');
                  setSelectedSusArea('all');
                }}
                className="text-xs"
              >
                Limpar todos
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Lista de Iniciativas */}
      <div className="space-y-4">
        {filteredInitiatives.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500">
              Nenhuma iniciativa encontrada com os filtros aplicados.
            </p>
          </Card>
        ) : (
          filteredInitiatives.map(initiative => (
            <Card key={initiative.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Link
                      to={`/initiatives/${initiative.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
                    >
                      {initiative.title}
                    </Link>
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {initiative.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getTypeBadgeColor(initiative.type)}>
                      {getTypeLabel(initiative.type)}
                    </Badge>
                    <Badge className={getStageBadgeColor(initiative.stage)}>
                      {getStageLabel(initiative.stage)}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {initiative.technology.slice(0, 5).map(tech => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {initiative.technology.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{initiative.technology.length - 5}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="size-4" />
                    <span>{initiative.institution}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="size-4" />
                    <span>{initiative.responsible}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="size-4" />
                    <span>{initiative.year}</span>
                  </div>
                  {initiative.url && (
                    <a
                      href={initiative.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                    >
                      <ExternalLink className="size-4" />
                      <span>Visitar site</span>
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <span className="text-sm text-gray-500">Áreas do SUS:</span>
                  {initiative.susArea.map(area => (
                    <Badge key={area} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
