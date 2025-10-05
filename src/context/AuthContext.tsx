export type Usuario = { id: number; nome: string; nomeUsuario: string; email: string };

type AuthContextType = { 
  usuario: Usuario | null; 
  login: (u: Usuario) => void; 
  logout: () => void; 
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => { 
    const raw = localStorage.getItem("auth:user"); 
    if (raw) setUsuario(JSON.parse(raw)); 
  }, []);

  const value = useMemo(() => ({
    usuario,
    login: (u: Usuario) => { 
      setUsuario(u); 
      localStorage.setItem("auth:user", JSON.stringify(u)); 
    },
    logout: () => { 
      setUsuario(null); 
      localStorage.removeItem("auth:user"); 
    }
  }), [usuario]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

