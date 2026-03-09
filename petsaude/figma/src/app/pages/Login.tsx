import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BookOpen, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

export default function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    const success = await login(loginEmail, loginPassword);
    if (success) {
      navigate("/");
    } else {
      setLoginError("Email ou senha incorretos");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    
    if (registerPassword.length < 6) {
      setRegisterError("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    
    const success = await register(registerName, registerEmail, registerPassword);
    if (success) {
      navigate("/");
    } else {
      setRegisterError("Este email já está cadastrado");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-10 h-10 text-blue-600" />
            <div className="text-left">
              <h1 className="font-bold text-2xl text-gray-900">BiblioSaúde</h1>
              <p className="text-sm text-gray-600">Biblioteca Digital da Saúde</p>
            </div>
          </Link>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Entrar na conta</CardTitle>
                <CardDescription>
                  Entre com seu email e senha para acessar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600">
                    <Link to="/" className="hover:text-blue-600">
                      ← Voltar para o início
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Criar conta</CardTitle>
                <CardDescription>
                  Crie uma conta para contribuir com a biblioteca
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  {registerError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{registerError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nome completo</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Seu nome"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-gray-500">Mínimo de 6 caracteres</p>
                  </div>

                  <Button type="submit" className="w-full">
                    Criar conta
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600">
                    <Link to="/" className="hover:text-blue-600">
                      ← Voltar para o início
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Nota:</strong> Este é um sistema de demonstração. Em produção, 
            os dados seriam armazenados de forma segura em um servidor.
          </p>
        </div>
      </div>
    </div>
  );
}
