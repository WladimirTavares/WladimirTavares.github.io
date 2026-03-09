import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-white">BiblioSaúde</span>
            </div>
            <p className="text-sm">
              Biblioteca Digital da Saúde - Informações, artigos e legislação sobre o Sistema Único de Saúde.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Início</Link></li>
              <li><Link to="/sus" className="hover:text-blue-400 transition-colors">Sobre o SUS</Link></li>
              <li><Link to="/artigos" className="hover:text-blue-400 transition-colors">Artigos</Link></li>
              <li><Link to="/legislacao" className="hover:text-blue-400 transition-colors">Legislação</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Como usar</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Glossário</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contribuir</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contato@bibliosaude.gov.br</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>0800 644 0136</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Brasília, DF</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© 2026 BiblioSaúde - Biblioteca Digital da Saúde. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
