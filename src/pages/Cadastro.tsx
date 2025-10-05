import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

type FormData = { nome: string; nomeUsuario: string; email: string };

export default function Cadastro() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    // lógica de cadastro virá no próximo commit
    console.log(data);
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-10">
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Cadastro</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-slate-300 font-medium mb-1 block" htmlFor="nome">Nome</label>
            <input id="nome" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" {...register("nome")} placeholder="Seu nome" />
          </div>
          <div>
            <label className="text-slate-300 font-medium mb-1 block" htmlFor="nomeUsuario">Usuário</label>
            <input id="nomeUsuario" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" {...register("nomeUsuario")} placeholder="seu usuário" />
          </div>
          <div>
            <label className="text-slate-300 font-medium mb-1 block" htmlFor="email">E-mail</label>
            <input id="email" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" type="email" {...register("email")} placeholder="seu@email.com" />
          </div>
          <button className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white" type="submit">Cadastrar</button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-slate-400">Já tem conta? </span>
          <Link className="text-indigo-400 hover:text-indigo-300" to="/login">Entrar</Link>
        </div>
      </div>
    </div>
  );
}