import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Página não encontrada
          </h2>
          <p className="text-gray-600 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button asChild>
            <Link to="/">Voltar para o início</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
