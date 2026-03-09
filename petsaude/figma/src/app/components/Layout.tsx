import { Link, useLocation } from 'react-router';
import { Activity, BarChart3, Plus, Search } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Activity className="size-8 text-emerald-600" />
              <div>
                <h1 className="font-semibold text-gray-900">
                  Repositório de Iniciativas Digitais em Saúde
                </h1>
                <p className="text-xs text-gray-500">
                  BVS-MS & Repositório Fiocruz
                </p>
              </div>
            </div>
          </div>

          <nav className="flex gap-1 -mb-px">
            <Link
              to="/"
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                isActive('/')
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="size-4" />
              Dashboard
            </Link>
            <Link
              to="/initiatives"
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                isActive('/initiatives')
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Search className="size-4" />
              Buscar Iniciativas
            </Link>
            <Link
              to="/new"
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                isActive('/new')
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Plus className="size-4" />
              Nova Iniciativa
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-500 text-center">
            Plataforma complementar à Biblioteca Virtual em Saúde do Ministério da Saúde (BVS-MS) e Repositório Institucional Fiocruz
          </p>
        </div>
      </footer>
    </div>
  );
}
