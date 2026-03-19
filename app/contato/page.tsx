"use client";
import { useState } from "react";
export default function Contato() {
 const [form, setForm] = useState({
   nome: "",
   email: "",
   whatsapp: "",
   mensagem: "",
 });
 const enviar = async (e: any) => {
   e.preventDefault();
   await fetch("https://cs-store-api-production.up.railway.app/contato", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(form),
   });
   alert("Mensagem enviada! Entraremos em contato.");
   setForm({ nome: "", email: "", whatsapp: "", mensagem: "" });
 };
 return (
<main
     style={{
       padding: "120px 20px",
       background: "#000",
       color: "white",
       minHeight: "100vh",
     }}
>
     {/* TÍTULO */}
<section style={{ textAlign: "center", marginBottom: "50px" }}>
<h1>
         ENTRE EM <span style={{ color: "#FFD700" }}>CONTATO</span>
</h1>
<p style={{ opacity: 0.7, marginTop: "10px" }}>
         Fale com a gente e tire suas dúvidas ou faça seu pedido
</p>
</section>
     {/* INFO */}
<section
       style={{
         maxWidth: "600px",
         margin: "0 auto 40px auto",
         textAlign: "center",
       }}
>
<p>📦 Enviamos para todo o Brasil</p>
<p>🎥 Enviamos vídeos reais dos produtos</p>
<p>📸 Fotos detalhadas antes da compra</p>
<p>⚡ Atendimento rápido via WhatsApp</p>
</section>
     {/* BOTÕES RÁPIDOS */}
<section
       style={{
         display: "flex",
         justifyContent: "center",
         gap: "10px",
         marginBottom: "50px",
         flexWrap: "wrap",
       }}
>
<a
         href="https://wa.me/5511972734037"
         target="_blank"
>
<button className="btnGold">WhatsApp</button>
</a>
<a
         href="https://instagram.com/criastudio.store"
         target="_blank"
>
<button className="btnOutline">Instagram</button>
</a>
<a
         href="https://drive.google.com/drive/folders/10KpOvWFRqXSpGgmhmOVFgu4On6zPc9yz"
         target="_blank"
>
<button className="btnOutline">Catálogo Drive</button>
</a>
</section>
     {/* FORMULÁRIO */}
<section style={{ maxWidth: "500px", margin: "0 auto" }}>
<form
         onSubmit={enviar}
         style={{
           display: "flex",
           flexDirection: "column",
           gap: "12px",
         }}
>
<input
           placeholder="Nome"
           value={form.nome}
           onChange={(e) =>
             setForm({ ...form, nome: e.target.value })
           }
         />
<input
           placeholder="Email"
           value={form.email}
           onChange={(e) =>
             setForm({ ...form, email: e.target.value })
           }
         />
<input
           placeholder="WhatsApp"
           value={form.whatsapp}
           onChange={(e) =>
             setForm({ ...form, whatsapp: e.target.value })
           }
         />
<textarea
           placeholder="Digite sua mensagem (ex: quero camisa do Flamengo tamanho M)"
           rows={4}
           value={form.mensagem}
           onChange={(e) =>
             setForm({ ...form, mensagem: e.target.value })
           }
           style={{ resize: "none" }}
         />
<button type="submit" className="btnGold">
           Enviar mensagem
</button>
</form>
</section>
</main>
 );
}
