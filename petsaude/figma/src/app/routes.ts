import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import SUS from "./pages/SUS";
import Artigos from "./pages/Artigos";
import Legislacao from "./pages/Legislacao";
import Login from "./pages/Login";
import Contribuir from "./pages/Contribuir";
import MinhasContribuicoes from "./pages/MinhasContribuicoes";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/sus",
    Component: SUS,
  },
  {
    path: "/artigos",
    Component: Artigos,
  },
  {
    path: "/legislacao",
    Component: Legislacao,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/contribuir",
    Component: Contribuir,
  },
  {
    path: "/minhas-contribuicoes",
    Component: MinhasContribuicoes,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);