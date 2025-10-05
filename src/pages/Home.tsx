import { useAuth } from "../context/AuthContext";
export default function Home() {
  const { usuario } = useAuth();
  return (
    <div className="max-w-2xl mx-auto p-4 mt-10">
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-3">Home</h2>
        {usuario && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">Nome: {usuario.nome}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">Email: {usuario.email}</span>
          </div>
        )}
        <p className="text-slate-300">Conteúdo protegido. Você está autenticado.</p>
      </div>
    </div>
  );
}
