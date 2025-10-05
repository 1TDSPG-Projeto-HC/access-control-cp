import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

type FormData = { nome: string; nomeUsuario: string; email: string };

export default function Cadastro() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    const nomeUsuario = data.nomeUsuario.trim().toLowerCase();
    const email = data.email.trim();
    const u = await api.get(`/usuarios`, { params: { nomeUsuario } });
    if (u.data && u.data.length > 0) { alert("Usuário já cadastrado."); return; }
    const e = await api.get(`/usuarios`, { params: { email } });
    if (e.data && e.data.length > 0) { alert("E-mail já cadastrado."); return; }
    await api.post(`/usuarios`, { nome: data.nome.trim(), nomeUsuario, email });
    alert("Cadastro realizado.");
    navigate("/login");
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-10">
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Cadastro</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-slate-300 font-medium mb-1 block" htmlFor="nome">Nome</label>
            <input id="nome" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20" {...register("nome", { required: "Informe o nome", minLength: { value: 2, message: "Mínimo 2 caracteres" } })} placeholder="Seu nome" />
            {errors.nome && <span className="text-red-400 text-sm">{errors.nome.message}</span>}
          </div>
          <div>
            <label className="text-slate-300 font-medium mb-1 block" htmlFor="nomeUsuario">Usuário</label>
            <input id="nomeUsuario" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20" {...register("nomeUsuario", { required: "Informe o usuário", minLength: { value: 3, message: "Mínimo 3 caracteres" } })} placeholder="seu usuário" />
            {errors.nomeUsuario && <span className="text-red-400 text-sm">{errors.nomeUsuario.message}</span>}
          </div>
          <div>
            <label className="text-slate-300 font-medium mb-1 block" htmlFor="email">E-mail</label>
            <input id="email" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20" type="email" {...register("email", { required: "Informe o e-mail", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido" } })} placeholder="seu@email.com" />
            {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
          </div>
          <button className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-500 active:scale-[.99] transition disabled:opacity-70" disabled={isSubmitting} type="submit">Cadastrar</button>
        </form>
        <div className="mt-4 text-center"><span className="text-slate-400">Já tem conta? </span>
        <Link className="text-indigo-400 hover:text-indigo-300" to="/login">Entrar</Link></div>
      </div>
    </div>
  );
}
