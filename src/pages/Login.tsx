import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

type FormData = { nomeUsuario: string; email: string };

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const { login } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    const res = await api.get(`/usuarios`, { params: { nomeUsuario: data.nomeUsuario.trim().toLowerCase(), email: data.email.trim() } });
    const user = res.data?.[0];
    if (!user) { alert("Usuário não encontrado. Confira usuário e e-mail."); return; }
    login(user);
    navigate("/home");
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-10">
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Entrar</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-slate-300 font-medium mb-1 block" htmlFor="usuario">Usuário</label>
            <input id="usuario" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20" {...register("nomeUsuario", { required: "Informe o usuário", minLength: { value: 3, message: "Mínimo 3 caracteres" } })} placeholder="seu usuário" />
            {errors.nomeUsuario && <span className="text-red-400 text-sm">{errors.nomeUsuario.message}</span>}
          </div>
          <div>
            <label className="text-slate-300 font-medium mb-1 block" htmlFor="email">E-mail</label>
            <input id="email" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20" type="email" {...register("email", { required: "Informe o e-mail", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido" } })} placeholder="seu@email.com" />
            {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
          </div>
          <button className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-500 active:scale-[.99] transition disabled:opacity-70" disabled={isSubmitting} type="submit">Entrar</button>
        </form>
        <div className="mt-4 text-center"><span className="text-slate-400">Não tem conta? </span><Link className="text-indigo-400 hover:text-indigo-300" to="/cadastro">Cadastre-se</Link></div>
      </div>
    </div>
  );
}
