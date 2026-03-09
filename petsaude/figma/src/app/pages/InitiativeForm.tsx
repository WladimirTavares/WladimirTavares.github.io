import { useState } from 'react';
import { useNavigate } from 'react-router';
import { typeOptions, stageOptions, susAreaOptions, technologyOptions } from '../data/mockData';
import { Save, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';

export function InitiativeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    stage: '',
    institution: '',
    responsible: '',
    contact: '',
    year: new Date().getFullYear().toString(),
    url: '',
  });

  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedSusAreas, setSelectedSusAreas] = useState<string[]>([]);
  const [customTechnology, setCustomTechnology] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas
    if (!formData.title || !formData.description || !formData.type || !formData.stage) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (selectedTechnologies.length === 0) {
      toast.error('Selecione pelo menos uma tecnologia.');
      return;
    }

    if (selectedSusAreas.length === 0) {
      toast.error('Selecione pelo menos uma área do SUS.');
      return;
    }

    // Simula o cadastro
    console.log('Nova iniciativa:', {
      ...formData,
      technology: selectedTechnologies,
      susArea: selectedSusAreas,
      target: targetAudience.split(',').map(t => t.trim()).filter(t => t),
    });

    toast.success('Iniciativa cadastrada com sucesso!');
    setTimeout(() => navigate('/initiatives'), 1500);
  };

  const handleTechnologyToggle = (tech: string) => {
    setSelectedTechnologies(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const handleAddCustomTechnology = () => {
    if (customTechnology.trim() && !selectedTechnologies.includes(customTechnology.trim())) {
      setSelectedTechnologies(prev => [...prev, customTechnology.trim()]);
      setCustomTechnology('');
    }
  };

  const handleSusAreaToggle = (area: string) => {
    setSelectedSusAreas(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Cadastrar Nova Iniciativa Digital
        </h2>
        <p className="text-gray-600 mt-1">
          Preencha os metadados padronizados para adicionar uma nova iniciativa ao repositório
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Informações Básicas</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">
                    Título da Iniciativa <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: TeleSUS - Plataforma Nacional de Telemedicina"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">
                    Descrição <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva a iniciativa, seus objetivos e funcionalidades principais..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">
                      Tipo de Iniciativa <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {typeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="stage">
                      Estágio de Maturidade <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.stage}
                      onValueChange={(value) => setFormData({ ...formData, stage: value })}
                    >
                      <SelectTrigger id="stage">
                        <SelectValue placeholder="Selecione o estágio" />
                      </SelectTrigger>
                      <SelectContent>
                        {stageOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Tecnologias */}
            <div className="pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-4">
                Tecnologias Utilizadas <span className="text-red-500">*</span>
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {technologyOptions.map(tech => (
                    <label
                      key={tech}
                      className="flex items-center gap-2 p-2 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedTechnologies.includes(tech)}
                        onCheckedChange={() => handleTechnologyToggle(tech)}
                      />
                      <span className="text-sm">{tech}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={customTechnology}
                    onChange={(e) => setCustomTechnology(e.target.value)}
                    placeholder="Adicionar tecnologia personalizada"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomTechnology())}
                  />
                  <Button type="button" onClick={handleAddCustomTechnology} variant="outline">
                    Adicionar
                  </Button>
                </div>

                {selectedTechnologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded">
                    {selectedTechnologies.map(tech => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleTechnologyToggle(tech)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Áreas do SUS */}
            <div className="pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-4">
                Áreas do SUS <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {susAreaOptions.map(area => (
                  <label
                    key={area}
                    className="flex items-center gap-2 p-3 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedSusAreas.includes(area)}
                      onCheckedChange={() => handleSusAreaToggle(area)}
                    />
                    <span className="text-sm">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Público-Alvo */}
            <div className="pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-4">Público-Alvo</h3>
              <div>
                <Label htmlFor="target">
                  Público-Alvo (separado por vírgulas)
                </Label>
                <Input
                  id="target"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Ex: Médicos APS, Especialistas, Enfermeiros, Pacientes"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Liste os públicos-alvo separados por vírgulas
                </p>
              </div>
            </div>

            {/* Informações Institucionais */}
            <div className="pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-4">Informações Institucionais</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="institution">Instituição</Label>
                    <Input
                      id="institution"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="Ex: Ministério da Saúde"
                    />
                  </div>

                  <div>
                    <Label htmlFor="year">Ano de Início</Label>
                    <Input
                      id="year"
                      type="number"
                      min="2000"
                      max="2030"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="responsible">Responsável</Label>
                    <Input
                      id="responsible"
                      value={formData.responsible}
                      onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                      placeholder="Nome do responsável"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact">E-mail de Contato</Label>
                    <Input
                      id="contact"
                      type="email"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="contato@instituicao.gov.br"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="url">Website (opcional)</Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3 pt-6 border-t">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="size-4" />
                Cadastrar Iniciativa
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/initiatives')}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
