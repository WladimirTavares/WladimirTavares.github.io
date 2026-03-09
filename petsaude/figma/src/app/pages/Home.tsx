import { Link } from "react-router";
import { BookOpen, FileText, Scale, TrendingUp, Users, Heart, Award, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">
                Biblioteca Digital da Saúde
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Acesse informações sobre o SUS, artigos científicos e legislação da área da saúde em um único lugar.
              </p>
              <div className="flex gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/artigos">
                    Explorar Artigos
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <Link to="/sus">Sobre o SUS</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Áreas de Conhecimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/sus">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>Sistema Único de Saúde</CardTitle>
                    <CardDescription>
                      Informações completas sobre o SUS, princípios, diretrizes e funcionamento do sistema público de saúde brasileiro.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/artigos">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle>Artigos Científicos</CardTitle>
                    <CardDescription>
                      Acervo de estudos, pesquisas e publicações científicas nas diversas áreas da saúde pública.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/legislacao">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Scale className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle>Legislação</CardTitle>
                    <CardDescription>
                      Leis, decretos, portarias e normas técnicas que regulamentam a saúde pública no Brasil.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">2.500+</div>
                <div className="text-gray-600">Artigos Disponíveis</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">1.200+</div>
                <div className="text-gray-600">Legislações</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
                <div className="text-gray-600">Usuários Ativos</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">100+</div>
                <div className="text-gray-600">Atualizações/Mês</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Destaques Recentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Estratégias de vacinação em comunidades remotas</CardTitle>
                      <CardDescription className="mt-2">
                        Estudo sobre a efetividade de diferentes abordagens para aumentar a cobertura vacinal em áreas de difícil acesso.
                      </CardDescription>
                      <Button variant="link" className="px-0 mt-2" asChild>
                        <Link to="/artigos">Ler artigo completo →</Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                      <Scale className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Nova Portaria sobre telemedicina</CardTitle>
                      <CardDescription className="mt-2">
                        Regulamentação atualizada sobre o uso de tecnologias de informação na assistência à saúde.
                      </CardDescription>
                      <Button variant="link" className="px-0 mt-2" asChild>
                        <Link to="/legislacao">Ver legislação →</Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
