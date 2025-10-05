export type Usuario = { id: number; nome: string; nomeUsuario: string; email: string };

type AuthContextType = { 
  usuario: Usuario | null; 
  login: (u: Usuario) => void; 
  logout: () => void; 
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
