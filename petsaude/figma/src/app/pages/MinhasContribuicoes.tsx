import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { FileText, Scale, Calendar, Clock } from "lucide-react";

export default function MinhasContribuicoes() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  // Buscar contribuições do localStorage
  const allContributions = JSON.parse(localStorage.getItem("bibliosaurus_contributions") || "[]");
  const myContributions = allContributions.filter((c: any) => c.data.submittedBy === user?.email);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved": return "Aprovado";
      case "pending": return "Em revisão";
      case "rejected": return "Rejeitado";
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Minhas Contribuições</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Acompanhe o status das suas contribuições para a biblioteca
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {myContributions.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Nenhuma contribuição ainda</CardTitle>
                    <CardDescription>
                      Você ainda não enviou nenhuma contribuição. Comece agora!
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">
                      Total de contribuições: {myContributions.length}
                    </h2>
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-600">
                        Em revisão: {myContributions.filter((c: any) => c.data.status === "pending").length}
                      </span>
                      <span className="text-gray-600">
                        Aprovadas: {myContributions.filter((c: any) => c.data.status === "approved").length}
                      </span>
                    </div>
                  </div>

                  {myContributions.map((contribution: any, index: number) => {
                    const isArticle = contribution.type === "article";
                    const data = contribution.data;

                    return (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {isArticle ? (
                                  <FileText className="w-5 h-5 text-green-600" />
                                ) : (
                                  <Scale className="w-5 h-5 text-purple-600" />
                                )}
                                <Badge variant="secondary">
                                  {isArticle ? "Artigo" : data.type}
                                </Badge>
                                <Badge className={getStatusColor(data.status)}>
                                  {getStatusText(data.status)}
                                </Badge>
                              </div>
                              
                              <CardTitle className="text-xl mb-2">
                                {isArticle ? data.title : `${data.type} nº ${data.number}`}
                              </CardTitle>
                              
                              {!isArticle && (
                                <CardDescription className="font-medium text-base">
                                  {data.title}
                                </CardDescription>
                              )}

                              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {isArticle ? data.year : data.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  Enviado em {formatDate(data.submittedAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          {isArticle ? (
                            <div className="space-y-2">
                              <p className="text-sm text-gray-700">
                                <strong>Autores:</strong> {data.authors.join(", ")}
                              </p>
                              <p className="text-sm text-gray-700">
                                <strong>Revista:</strong> {data.journal}
                              </p>
                              <p className="text-sm text-gray-700">
                                <strong>Categoria:</strong> {data.category}
                              </p>
                              <p className="text-sm text-gray-700 mt-3">
                                {data.abstract.substring(0, 200)}...
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-sm text-gray-700">
                                <strong>Categoria:</strong> {data.category}
                              </p>
                              <p className="text-sm text-gray-700 mt-3">
                                {data.summary}
                              </p>
                            </div>
                          )}

                          {data.status === "pending" && (
                            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                              <p className="text-sm text-yellow-800">
                                Sua contribuição está em análise. Você receberá uma notificação quando for revisada.
                              </p>
                            </div>
                          )}
                          
                          {data.status === "approved" && (
                            <div className="mt-4 p-3 bg-green-50 rounded-lg">
                              <p className="text-sm text-green-800">
                                Parabéns! Sua contribuição foi aprovada e está disponível na biblioteca.
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
