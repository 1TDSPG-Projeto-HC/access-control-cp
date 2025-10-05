# Access Control CP — Versão Visual

Autenticação com React Hook Form e json-server, layout simples e moderno

## Integrantes
- Pedro Vaz — RM: 566551
- João Victor Resende — RM: 565139 
- Alexandre Hirata — RM: 563631

## Requisitos atendidos
- Rota `/login` como página inicial e link para `/cadastro`
- Formulários com React Hook Form e mensagens de erro
- Cadastro verifica duplicidade de `nomeUsuario` e `email` no json-server
- Login valida `nomeUsuario` + `email`
- Autenticação com `localStorage`
- Rota protegida exibindo nome e e-mail em todas as páginas (header fixo)

## Como rodar
```bash
npm i
npm run dev
