import { Link, useLocation } from "react-router";
import { BookOpen, Search, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header() {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="font-bold text-xl text-gray-900">BiblioSaúde</h1>
              <p className="text-xs text-gray-600">Biblioteca Digital da Saúde</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Início
            </Link>
            <Link 
              to="/sus" 
              className={`transition-colors ${isActive('/sus') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              SUS
            </Link>
            <Link 
              to="/artigos" 
              className={`transition-colors ${isActive('/artigos') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Artigos
            </Link>
            <Link 
              to="/legislacao" 
              className={`transition-colors ${isActive('/legislacao') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Legislação
            </Link>
            {isAuthenticated && (
              <Link 
                to="/contribuir" 
                className={`transition-colors ${isActive('/contribuir') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Contribuir
              </Link>
            )}
          </nav>
          
          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Buscar..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="w-5 h-5" />
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div>
                      <div className="font-semibold">{user?.name}</div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/contribuir">Contribuir</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/minhas-contribuicoes">Minhas Contribuições</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default">
                <Link to="/login">Entrar</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}