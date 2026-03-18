"use client";
import { useState } from "react";
export default function Contato() {
 const [form, setForm] = useState({
   nome: "",
   email: "",
   whatsapp: "",
   mensagem: ""
 });
 const enviar = async (e: any) => {
   e.preventDefault();
   await fetch("https://cs-store-api-production.up.railway.app/contato", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(form)
   });
   alert("Mensagem enviada!");
 };
 return (
<form onSubmit={enviar} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
<input placeholder="Nome" onChange={e => setForm({...form, nome: e.target.value})} />
<input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
<input placeholder="WhatsApp" onChange={e => setForm({...form, whatsapp: e.target.value})} />
<textarea placeholder="Mensagem" onChange={e => setForm({...form, mensagem: e.target.value})} />
<button type="submit">Enviar</button>
</form>
 );
}
