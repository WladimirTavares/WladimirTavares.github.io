import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search, Filter, Calendar, Users, ExternalLink, BookOpen } from "lucide-react";

interface Article {
  id: number;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  category: string;
  abstract: string;
  tags: string[];
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Impacto da telemedicina na saúde rural brasileira: uma análise longitudinal",
    authors: ["Silva, M.A.", "Santos, J.C.", "Oliveira, P.R."],
    journal: "Revista Brasileira de Saúde Pública",
    year: 2025,
    category: "Telemedicina",
    abstract: "Este estudo examina o impacto da implementação de serviços de telemedicina em comunidades rurais do Brasil entre 2020 e 2024, analisando indicadores de acesso, qualidade e satisfação dos usuários.",
    tags: ["telemedicina", "saúde rural", "acesso à saúde"]
  },
  {
    id: 2,
    title: "Estratégias efetivas para aumento da cobertura vacinal no contexto pós-pandemia",
    authors: ["Costa, A.B.", "Fernandes, L.M."],
    journal: "Cadernos de Saúde Pública",
    year: 2026,
    category: "Imunização",
    abstract: "Análise de estratégias implementadas em diferentes estados brasileiros para recuperar e ampliar as taxas de cobertura vacinal após a pandemia de COVID-19.",
    tags: ["vacinação", "saúde pública", "imunização"]
  },
  {
    id: 3,
    title: "Protocolos de atenção primária para doenças crônicas não transmissíveis",
    authors: ["Almeida, R.F.", "Rodrigues, C.S.", "Lima, T.A.", "Martins, E.P."],
    journal: "Revista de Medicina Familiar e Comunitária",
    year: 2025,
    category: "Atenção Primária",
    abstract: "Desenvolvimento e validação de protocolos clínicos para manejo de diabetes, hipertensão e obesidade na atenção básica, com foco na realidade brasileira.",
    tags: ["atenção primária", "doenças crônicas", "protocolos clínicos"]
  },
  {
    id: 4,
    title: "Saúde mental nas unidades básicas: integração de cuidados e resultados",
    authors: ["Moreira, K.L.", "Carvalho, D.N."],
    journal: "Jornal Brasileiro de Psiquiatria Comunitária",
    year: 2025,
    category: "Saúde Mental",
    abstract: "Avaliação de modelos de integração de serviços de saúde mental na atenção primária e seu impacto nos indicadores de saúde da população.",
    tags: ["saúde mental", "atenção básica", "integração"]
  },
  {
    id: 5,
    title: "Determinantes sociais da saúde em populações vulneráveis urbanas",
    authors: ["Souza, V.M.", "Pereira, H.J.", "Nascimento, F.A."],
    journal: "Saúde e Sociedade",
    year: 2024,
    category: "Epidemiologia",
    abstract: "Investigação dos determinantes sociais que influenciam os desfechos de saúde em comunidades de baixa renda em grandes centros urbanos brasileiros.",
    tags: ["determinantes sociais", "vulnerabilidade", "epidemiologia"]
  },
  {
    id: 6,
    title: "Efetividade de intervenções nutricionais no combate à desnutrição infantil",
    authors: ["Barros, I.C.", "Teixeira, G.M."],
    journal: "Revista de Nutrição em Saúde Pública",
    year: 2026,
    category: "Nutrição",
    abstract: "Revisão sistemática e meta-análise de programas de intervenção nutricional para crianças de 0 a 5 anos no contexto do SUS.",
    tags: ["nutrição infantil", "desnutrição", "intervenções"]
  },
  {
    id: 7,
    title: "Gestão de recursos humanos em saúde: desafios e inovações",
    authors: ["Miranda, P.L.", "Azevedo, S.R.", "Campos, M.H."],
    journal: "Revista de Administração em Saúde",
    year: 2025,
    category: "Gestão",
    abstract: "Análise das práticas de gestão de recursos humanos no SUS, identificando desafios e propondo estratégias inovadoras para atração e retenção de profissionais.",
    tags: ["gestão em saúde", "recursos humanos", "SUS"]
  },
  {
    id: 8,
    title: "Impacto das políticas de redução de danos no uso de substâncias",
    authors: ["Ribeiro, N.O.", "Gomes, Q.P."],
    journal: "Ciência & Saúde Coletiva",
    year: 2025,
    category: "Saúde Pública",
    abstract: "Avaliação do impacto de políticas de redução de danos implementadas em capitais brasileiras sobre indicadores de saúde relacionados ao uso de substâncias.",
    tags: ["redução de danos", "políticas públicas", "dependência química"]
  }
];

export default function Artigos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const categories = ["all", ...Array.from(new Set(mockArticles.map(a => a.category)))];
  
  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         article.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Artigos Científicos</h1>
            <p className="text-xl text-green-100 max-w-3xl">
              Acervo de estudos e publicações científicas sobre saúde pública no Brasil.
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
                  placeholder="Buscar por título, autor ou palavras-chave..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
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
              {filteredArticles.length} artigo(s) encontrado(s)
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-6">
              {filteredArticles.map(article => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{article.category}</Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {article.year}
                          </span>
                        </div>
                        <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                        <CardDescription className="text-sm flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {article.authors.join(", ")}
                        </CardDescription>
                        <p className="text-sm text-gray-500 mt-1 italic">{article.journal}</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-green-600 flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{article.abstract}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="link" className="gap-2">
                        Ler completo
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Estatísticas da Biblioteca</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl text-green-600">2.547</CardTitle>
                    <CardDescription>Artigos disponíveis</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl text-green-600">45</CardTitle>
                    <CardDescription>Periódicos indexados</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl text-green-600">1.200+</CardTitle>
                    <CardDescription>Autores cadastrados</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl text-green-600">150+</CardTitle>
                    <CardDescription>Novos artigos/mês</CardDescription>
                  </CardHeader>
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
