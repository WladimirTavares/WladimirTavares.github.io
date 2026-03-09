import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Heart, Users, Scale, Shield, Target, Building2 } from "lucide-react";

export default function SUS() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sistema Único de Saúde</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              O maior sistema público de saúde do mundo, garantindo acesso integral, universal e gratuito à saúde para toda população brasileira.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="principios" className="space-y-8">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
                <TabsTrigger value="principios">Princípios</TabsTrigger>
                <TabsTrigger value="diretrizes">Diretrizes</TabsTrigger>
                <TabsTrigger value="estrutura">Estrutura</TabsTrigger>
              </TabsList>

              <TabsContent value="principios" className="space-y-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold mb-8 text-center">Princípios Fundamentais do SUS</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <Heart className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle>Universalidade</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          A saúde é um direito de todos. O SUS garante acesso aos serviços de saúde em todos os níveis de complexidade, sem qualquer discriminação.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                          <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <CardTitle>Equidade</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Reduzir desigualdades oferecendo mais recursos a quem mais precisa, considerando as diferenças entre indivíduos e grupos.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                          <Scale className="w-6 h-6 text-purple-600" />
                        </div>
                        <CardTitle>Integralidade</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Atendimento integral com prioridade para atividades preventivas, sem prejuízo dos serviços assistenciais.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="mt-8">
                    <CardHeader>
                      <CardTitle>Sobre a Universalidade</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        O princípio da universalidade é a base constitucional do SUS. Estabelecido pela Constituição Federal de 1988, determina que a saúde é direito de todos e dever do Estado.
                      </p>
                      <p>
                        Isso significa que qualquer pessoa, independentemente de cor, raça, religião, local de moradia, situação de emprego ou renda, tem direito ao acesso às ações e serviços de saúde.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Atendimento sem preconceitos ou privilégios</li>
                        <li>Acesso a todos os níveis de assistência</li>
                        <li>Gratuidade em todos os serviços</li>
                        <li>Cobertura em todo território nacional</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="diretrizes" className="space-y-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold mb-8 text-center">Diretrizes Organizacionais</h2>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Target className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle>Descentralização</CardTitle>
                            <CardDescription>Redistribuição de responsabilidades</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">
                          A gestão do SUS é descentralizada, com direção única em cada esfera de governo:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Federal: Ministério da Saúde</li>
                          <li>Estadual: Secretarias Estaduais de Saúde</li>
                          <li>Municipal: Secretarias Municipais de Saúde</li>
                        </ul>
                        <p className="mt-4">
                          Os municípios têm autonomia para gerir seus serviços, respeitando os princípios e diretrizes gerais do sistema.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <CardTitle>Regionalização e Hierarquização</CardTitle>
                            <CardDescription>Organização territorial dos serviços</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">
                          Os serviços de saúde são organizados em níveis crescentes de complexidade:
                        </p>
                        <div className="space-y-3">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold mb-2">Atenção Básica</h4>
                            <p className="text-sm text-gray-700">
                              Unidades Básicas de Saúde e Estratégia Saúde da Família - primeiro contato e resolutividade de 80% dos casos.
                            </p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold mb-2">Atenção Secundária</h4>
                            <p className="text-sm text-gray-700">
                              Especialidades médicas, exames e procedimentos de média complexidade.
                            </p>
                          </div>
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold mb-2">Atenção Terciária</h4>
                            <p className="text-sm text-gray-700">
                              Hospitais de referência e procedimentos de alta complexidade.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Shield className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <CardTitle>Participação Social</CardTitle>
                            <CardDescription>Controle social e democracia</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">
                          A comunidade participa da gestão do SUS através de instâncias colegiadas:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Conselhos de Saúde (nacional, estaduais e municipais)</li>
                          <li>Conferências de Saúde (a cada 4 anos)</li>
                          <li>Comissões intergestores</li>
                          <li>Ouvidorias e canais de participação popular</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="estrutura" className="space-y-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold mb-8 text-center">Estrutura e Organização</h2>
                  
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>História do SUS</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        O Sistema Único de Saúde foi criado pela Constituição Federal de 1988 e regulamentado pelas Leis nº 8.080/90 (Lei Orgânica da Saúde) e nº 8.142/90.
                      </p>
                      <p>
                        Antes do SUS, apenas trabalhadores com carteira assinada tinham direito à saúde pública. O restante da população dependia de serviços filantrópicos ou pagava por atendimento.
                      </p>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Linha do Tempo</h4>
                        <ul className="space-y-2 text-sm">
                          <li><strong>1988:</strong> Constituição Federal estabelece a saúde como direito de todos</li>
                          <li><strong>1990:</strong> Leis 8.080 e 8.142 regulamentam o SUS</li>
                          <li><strong>1994:</strong> Criação do Programa Saúde da Família</li>
                          <li><strong>2011:</strong> Decreto 7.508 regulamenta a Lei 8.080</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Financiamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        O SUS é financiado com recursos dos três níveis de governo:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-2">União</div>
                          <p className="text-sm">Maior parte do orçamento federal</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-600 mb-2">Estados</div>
                          <p className="text-sm">Mínimo de 12% da receita</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-2">Municípios</div>
                          <p className="text-sm">Mínimo de 15% da receita</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Principais Programas e Serviços</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Estratégia Saúde da Família (ESF)</h4>
                          <p className="text-sm text-gray-700">
                            Equipes multidisciplinares que atendem até 4 mil pessoas em uma área definida.
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">SAMU - 192</h4>
                          <p className="text-sm text-gray-700">
                            Serviço de Atendimento Móvel de Urgência disponível 24 horas por dia.
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Farmácia Popular</h4>
                          <p className="text-sm text-gray-700">
                            Medicamentos gratuitos ou com desconto para diversas condições de saúde.
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Programa Nacional de Imunizações</h4>
                          <p className="text-sm text-gray-700">
                            Um dos maiores programas de vacinação do mundo, oferecendo vacinas gratuitamente.
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Brasil Sorridente</h4>
                          <p className="text-sm text-gray-700">
                            Maior programa público de saúde bucal do mundo.
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Transplantes</h4>
                          <p className="text-sm text-gray-700">
                            Maior sistema público de transplantes, responsável por 95% dos transplantes no país.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
