import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "contributor";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Carregar usuário do localStorage ao iniciar
    const savedUser = localStorage.getItem("bibliosaurus_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de login - em produção, isso seria uma chamada à API
    const users = JSON.parse(localStorage.getItem("bibliosaurus_users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };
      setUser(userWithoutPassword);
      localStorage.setItem("bibliosaurus_user", JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulação de registro - em produção, isso seria uma chamada à API
    const users = JSON.parse(localStorage.getItem("bibliosaurus_users") || "[]");
    
    // Verificar se email já existe
    if (users.find((u: any) => u.email === email)) {
      return false;
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // Em produção, NUNCA armazene senhas em texto puro!
      role: "contributor" as const,
    };
    
    users.push(newUser);
    localStorage.setItem("bibliosaurus_users", JSON.stringify(users));
    
    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    setUser(userWithoutPassword);
    localStorage.setItem("bibliosaurus_user", JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bibliosaurus_user");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
