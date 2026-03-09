import { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { FileText, Scale, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Contribuir() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  // Redirecionar se não estiver autenticado
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  // Estados para formulário de artigo
  const [articleTitle, setArticleTitle] = useState("");
  const [articleAuthors, setArticleAuthors] = useState("");
  const [articleJournal, setArticleJournal] = useState("");
  const [articleYear, setArticleYear] = useState("");
  const [articleCategory, setArticleCategory] = useState("");
  const [articleAbstract, setArticleAbstract] = useState("");
  const [articleTags, setArticleTags] = useState("");

  // Estados para formulário de legislação
  const [legType, setLegType] = useState("");
  const [legNumber, setLegNumber] = useState("");
  const [legDate, setLegDate] = useState("");
  const [legTitle, setLegTitle] = useState("");
  const [legSummary, setLegSummary] = useState("");
  const [legCategory, setLegCategory] = useState("");

  const handleArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Em produção, isso seria enviado para uma API
    const newArticle = {
      id: Date.now(),
      title: articleTitle,
      authors: articleAuthors.split(",").map(a => a.trim()),
      journal: articleJournal,
      year: parseInt(articleYear),
      category: articleCategory,
      abstract: articleAbstract,
      tags: articleTags.split(",").map(t => t.trim()),
      submittedBy: user?.email,
      submittedAt: new Date().toISOString(),
      status: "pending"
    };

    // Salvar no localStorage temporariamente
    const contributions = JSON.parse(localStorage.getItem("bibliosaurus_contributions") || "[]");
    contributions.push({ type: "article", data: newArticle });
    localStorage.setItem("bibliosaurus_contributions", JSON.stringify(contributions));

    toast.success("Artigo enviado com sucesso!", {
      description: "Sua contribuição será revisada pela equipe."
    });

    setShowSuccess(true);
    
    // Limpar formulário
    setArticleTitle("");
    setArticleAuthors("");
    setArticleJournal("");
    setArticleYear("");
    setArticleCategory("");
    setArticleAbstract("");
    setArticleTags("");

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleLegislationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLegislation = {
      id: Date.now(),
      type: legType,
      number: legNumber,
      date: legDate,
      title: legTitle,
      summary: legSummary,
      category: legCategory,
      submittedBy: user?.email,
      submittedAt: new Date().toISOString(),
      status: "pending"
    };

    const contributions = JSON.parse(localStorage.getItem("bibliosaurus_contributions") || "[]");
    contributions.push({ type: "legislation", data: newLegislation });
    localStorage.setItem("bibliosaurus_contributions", JSON.stringify(contributions));

    toast.success("Legislação enviada com sucesso!", {
      description: "Sua contribuição será revisada pela equipe."
    });

    setShowSuccess(true);

    // Limpar formulário
    setLegType("");
    setLegNumber("");
    setLegDate("");
    setLegTitle("");
    setLegSummary("");
    setLegCategory("");

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Contribuir com a Biblioteca</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Ajude a expandir o conhecimento compartilhando artigos científicos e legislações.
            </p>
          </div>
        </section>

        {showSuccess && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <div className="container mx-auto px-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Contribuição enviada!</p>
                <p className="text-sm text-green-700">Obrigado por contribuir com a BiblioSaúde.</p>
              </div>
            </div>
          </div>
        )}

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Bem-vindo, {user?.name}!</CardTitle>
                  <CardDescription>
                    Use os formulários abaixo para adicionar novos conteúdos à biblioteca. 
                    Todas as contribuições passam por revisão antes de serem publicadas.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Tabs defaultValue="article" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="article" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Artigo Científico
                  </TabsTrigger>
                  <TabsTrigger value="legislation" className="gap-2">
                    <Scale className="w-4 h-4" />
                    Legislação
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="article">
                  <Card>
                    <CardHeader>
                      <CardTitle>Adicionar Artigo Científico</CardTitle>
                      <CardDescription>
                        Preencha as informações do artigo científico
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleArticleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="article-title">Título do Artigo *</Label>
                          <Input
                            id="article-title"
                            value={articleTitle}
                            onChange={(e) => setArticleTitle(e.target.value)}
                            placeholder="Título completo do artigo"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="article-authors">Autores *</Label>
                            <Input
                              id="article-authors"
                              value={articleAuthors}
                              onChange={(e) => setArticleAuthors(e.target.value)}
                              placeholder="Sobrenome, N., Sobrenome, N."
                              required
                            />
                            <p className="text-xs text-gray-500">Separe os autores por vírgula</p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="article-journal">Revista/Periódico *</Label>
                            <Input
                              id="article-journal"
                              value={articleJournal}
                              onChange={(e) => setArticleJournal(e.target.value)}
                              placeholder="Nome da revista"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="article-year">Ano de Publicação *</Label>
                            <Input
                              id="article-year"
                              type="number"
                              value={articleYear}
                              onChange={(e) => setArticleYear(e.target.value)}
                              placeholder="2024"
                              min="1900"
                              max="2030"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="article-category">Categoria *</Label>
                            <Select value={articleCategory} onValueChange={setArticleCategory} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Telemedicina">Telemedicina</SelectItem>
                                <SelectItem value="Imunização">Imunização</SelectItem>
                                <SelectItem value="Atenção Primária">Atenção Primária</SelectItem>
                                <SelectItem value="Saúde Mental">Saúde Mental</SelectItem>
                                <SelectItem value="Epidemiologia">Epidemiologia</SelectItem>
                                <SelectItem value="Nutrição">Nutrição</SelectItem>
                                <SelectItem value="Gestão">Gestão</SelectItem>
                                <SelectItem value="Saúde Pública">Saúde Pública</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="article-abstract">Resumo/Abstract *</Label>
                          <Textarea
                            id="article-abstract"
                            value={articleAbstract}
                            onChange={(e) => setArticleAbstract(e.target.value)}
                            placeholder="Resumo do artigo em português"
                            rows={5}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="article-tags">Palavras-chave</Label>
                          <Input
                            id="article-tags"
                            value={articleTags}
                            onChange={(e) => setArticleTags(e.target.value)}
                            placeholder="saúde pública, prevenção, epidemiologia"
                          />
                          <p className="text-xs text-gray-500">Separe as palavras-chave por vírgula</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="article-file">Arquivo PDF (opcional)</Label>
                          <div className="border-2 border-dashed rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600 mb-2">
                              Clique para fazer upload ou arraste o arquivo
                            </p>
                            <p className="text-xs text-gray-500">PDF até 10MB</p>
                            <Input
                              id="article-file"
                              type="file"
                              accept=".pdf"
                              className="hidden"
                            />
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button type="submit" className="flex-1">
                            Enviar Artigo
                          </Button>
                          <Button type="button" variant="outline" onClick={() => navigate("/")}>
                            Cancelar
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="legislation">
                  <Card>
                    <CardHeader>
                      <CardTitle>Adicionar Legislação</CardTitle>
                      <CardDescription>
                        Preencha as informações da lei, decreto ou portaria
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleLegislationSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="leg-type">Tipo *</Label>
                            <Select value={legType} onValueChange={setLegType} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Lei">Lei</SelectItem>
                                <SelectItem value="Decreto">Decreto</SelectItem>
                                <SelectItem value="Portaria">Portaria</SelectItem>
                                <SelectItem value="Resolução">Resolução</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="leg-number">Número *</Label>
                            <Input
                              id="leg-number"
                              value={legNumber}
                              onChange={(e) => setLegNumber(e.target.value)}
                              placeholder="Ex: 8.080"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="leg-date">Data *</Label>
                            <Input
                              id="leg-date"
                              type="date"
                              value={legDate}
                              onChange={(e) => setLegDate(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="leg-title">Título/Ementa *</Label>
                          <Input
                            id="leg-title"
                            value={legTitle}
                            onChange={(e) => setLegTitle(e.target.value)}
                            placeholder="Título ou ementa da legislação"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="leg-category">Categoria *</Label>
                          <Select value={legCategory} onValueChange={setLegCategory} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Organização do SUS">Organização do SUS</SelectItem>
                              <SelectItem value="Atenção Básica">Atenção Básica</SelectItem>
                              <SelectItem value="Telemedicina">Telemedicina</SelectItem>
                              <SelectItem value="Vigilância Sanitária">Vigilância Sanitária</SelectItem>
                              <SelectItem value="Tecnologia da Informação">Tecnologia da Informação</SelectItem>
                              <SelectItem value="Ética e Pesquisa">Ética e Pesquisa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="leg-summary">Resumo *</Label>
                          <Textarea
                            id="leg-summary"
                            value={legSummary}
                            onChange={(e) => setLegSummary(e.target.value)}
                            placeholder="Descreva brevemente o que a legislação estabelece"
                            rows={5}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="leg-file">Arquivo PDF (opcional)</Label>
                          <div className="border-2 border-dashed rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600 mb-2">
                              Clique para fazer upload ou arraste o arquivo
                            </p>
                            <p className="text-xs text-gray-500">PDF até 10MB</p>
                            <Input
                              id="leg-file"
                              type="file"
                              accept=".pdf"
                              className="hidden"
                            />
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button type="submit" className="flex-1">
                            Enviar Legislação
                          </Button>
                          <Button type="button" variant="outline" onClick={() => navigate("/")}>
                            Cancelar
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
