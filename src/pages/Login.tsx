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