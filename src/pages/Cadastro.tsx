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

