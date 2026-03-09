import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search, Filter, Calendar, FileText, ExternalLink, Scale } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

interface Legislation {
  id: number;
  type: "Lei" | "Decreto" | "Portaria" | "Resolução";
  number: string;
  date: string;
  title: string;
  summary: string;
  category: string;
  status: "Vigente" | "Revogada" | "Alterada";
}

const mockLegislation: Legislation[] = [
  {
    id: 1,
    type: "Lei",
    number: "8.080",
    date: "19/09/1990",
    title: "Lei Orgânica da Saúde",
    summary: "Dispõe sobre as condições para a promoção, proteção e recuperação da saúde, a organização e o funcionamento dos serviços correspondentes e dá outras providências.",
    category: "Organização do SUS",
    status: "Vigente"
  },
  {
    id: 2,
    type: "Lei",
    number: "8.142",
    date: "28/12/1990",
    title: "Participação da comunidade na gestão do SUS",
    summary: "Dispõe sobre a participação da comunidade na gestão do Sistema Único de Saúde (SUS) e sobre as transferências intergovernamentais de recursos financeiros na área da saúde.",
    category: "Organização do SUS",
    status: "Vigente"
  },
  {
    id: 3,
    type: "Decreto",
    number: "7.508",
    date: "28/06/2011",
    title: "Regulamentação da Lei 8.080/90",
    summary: "Regulamenta a Lei nº 8.080, de 19 de setembro de 1990, para dispor sobre a organização do Sistema Único de Saúde - SUS, o planejamento da saúde, a assistência à saúde e a articulação interfederativa.",
    category: "Organização do SUS",
    status: "Vigente"
  },
  {
    id: 4,
    type: "Portaria",
    number: "2.436",
    date: "21/09/2017",
    title: "Política Nacional de Atenção Básica",
    summary: "Aprova a Política Nacional de Atenção Básica, estabelecendo a revisão de diretrizes para a organização da Atenção Básica, no âmbito do Sistema Único de Saúde (SUS).",
    category: "Atenção Básica",
    status: "Vigente"
  },
  {
    id: 5,
    type: "Portaria",
    number: "467",
    date: "20/03/2020",
    title: "Telemedicina em caráter excepcional",
    summary: "Dispõe, em caráter excepcional e temporário, sobre as ações de Telemedicina, com o objetivo de regulamentar e operacionalizar as medidas de enfrentamento da emergência de saúde pública.",
    category: "Telemedicina",
    status: "Alterada"
  },
  {
    id: 6,
    type: "Lei",
    number: "13.979",
    date: "06/02/2020",
    title: "Medidas de emergência em saúde pública",
    summary: "Dispõe sobre as medidas para enfrentamento da emergência de saúde pública de importância internacional decorrente do coronavírus.",
    category: "Vigilância Sanitária",
    status: "Vigente"
  },
  {
    id: 7,
    type: "Portaria",
    number: "1.555",
    date: "30/07/2013",
    title: "Prontuário Eletrônico",
    summary: "Dispõe sobre as normas de financiamento e de execução do Componente Básico da Assistência Farmacêutica no âmbito do Sistema Único de Saúde (SUS).",
    category: "Tecnologia da Informação",
    status: "Vigente"
  },
  {
    id: 8,
    type: "Resolução",
    number: "466",
    date: "12/12/2012",
    title: "Ética em Pesquisa com Seres Humanos",
    summary: "Aprova as diretrizes e normas regulamentadoras de pesquisas envolvendo seres humanos.",
    category: "Ética e Pesquisa",
    status: "Vigente"
  },
  {
    id: 9,
    type: "Portaria",
    number: "2.979",
    date: "12/11/2019",
    title: "Programa Previne Brasil",
    summary: "Institui o Programa Previne Brasil, que estabelece novo modelo de financiamento de custeio da Atenção Primária à Saúde no âmbito do Sistema Único de Saúde.",
    category: "Atenção Básica",
    status: "Vigente"
  },
  {
    id: 10,
    type: "Lei",
    number: "14.510",
    date: "27/12/2022",
    title: "Telemedicina e Telessaúde",
    summary: "Altera a Lei nº 13.989, de 15 de abril de 2020, para prorrogar a autorização para a prestação de serviços de telemedicina durante a pandemia.",
    category: "Telemedicina",
    status: "Vigente"
  }
];

export default function Legislacao() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const types = ["all", ...Array.from(new Set(mockLegislation.map(l => l.type)))];
  const categories = ["all", ...Array.from(new Set(mockLegislation.map(l => l.category)))];
  
  const filteredLegislation = mockLegislation.filter(leg => {
    const matchesSearch = leg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leg.number.includes(searchTerm) ||
                         leg.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || leg.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || leg.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Vigente": return "bg-green-100 text-green-800";
      case "Revogada": return "bg-red-100 text-red-800";
      case "Alterada": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Legislação em Saúde</h1>
            <p className="text-xl text-purple-100 max-w-3xl">
              Acesso a leis, decretos, portarias e resoluções que regulamentam o sistema de saúde brasileiro.
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar por número, título ou palavras-chave..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {types.slice(1).map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.slice(1).map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              {filteredLegislation.length} documento(s) encontrado(s)
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="list" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="list">Lista de Documentos</TabsTrigger>
                <TabsTrigger value="categories">Por Categoria</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-4">
                {filteredLegislation.map(leg => (
                  <Card key={leg.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge variant="secondary">{leg.type}</Badge>
                            <Badge className={getStatusColor(leg.status)}>{leg.status}</Badge>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {leg.date}
                            </span>
                          </div>
                          <CardTitle className="text-xl mb-2">
                            {leg.type} nº {leg.number}
                          </CardTitle>
                          <CardDescription className="font-medium text-base">
                            {leg.title}
                          </CardDescription>
                          <p className="text-sm text-gray-500 mt-1">{leg.category}</p>
                        </div>
                        <Scale className="w-8 h-8 text-purple-600 flex-shrink-0" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{leg.summary}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <FileText className="w-4 h-4" />
                            Ver PDF
                          </Button>
                        </div>
                        <Button variant="link" className="gap-2">
                          Acessar no Diário Oficial
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="categories">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {categories.slice(1).map(category => {
                    const categoryItems = mockLegislation.filter(leg => leg.category === category);
                    return (
                      <AccordionItem key={category} value={category}>
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center justify-between w-full pr-4">
                            <span>{category}</span>
                            <Badge variant="secondary">{categoryItems.length}</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-4">
                            {categoryItems.map(leg => (
                              <Card key={leg.id}>
                                <CardHeader>
                                  <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="text-xs">{leg.type}</Badge>
                                        <Badge className={`${getStatusColor(leg.status)} text-xs`}>{leg.status}</Badge>
                                        <span className="text-xs text-gray-500">{leg.date}</span>
                                      </div>
                                      <CardTitle className="text-base">
                                        {leg.type} nº {leg.number} - {leg.title}
                                      </CardTitle>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-gray-700 mb-3">{leg.summary}</p>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                      <FileText className="w-3 h-3" />
                                      Ver PDF
                                    </Button>
                                    <Button variant="link" size="sm" className="gap-2">
                                      Diário Oficial
                                      <ExternalLink className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Referência Rápida</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Marcos Legais do SUS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Lei 8.080/1990:</strong> Lei Orgânica da Saúde - base legal do SUS
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Lei 8.142/1990:</strong> Participação social e transferências de recursos
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Decreto 7.508/2011:</strong> Organização e planejamento do SUS
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Documentos Mais Acessados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Política Nacional de Atenção Básica</span>
                        <Badge variant="secondary">Port. 2.436/2017</Badge>
                      </li>
                      <li className="flex justify-between">
                        <span>Programa Previne Brasil</span>
                        <Badge variant="secondary">Port. 2.979/2019</Badge>
                      </li>
                      <li className="flex justify-between">
                        <span>Telemedicina e Telessaúde</span>
                        <Badge variant="secondary">Lei 14.510/2022</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
