"use client";
import { useState } from "react";
export default function ProductCard({ produto }: any) {
 const [tamanho, setTamanho] = useState("");
 // ============================
 // 🛒 COMPRAR
 // ============================
 const comprar = () => {
   if (!tamanho) {
     alert("⚠️ Selecione um tamanho primeiro");
     return;
   }
   const texto = `Quero comprar: ${produto.nome} | Tamanho: ${tamanho}`;
   window.open(
     `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`
   );
 };
 // ============================
 // 🔔 AVISO
 // ============================
 const enviarAviso = async () => {
   if (!tamanho) {
     alert("⚠️ Escolha um tamanho primeiro");
     return;
   }
   const email = prompt("Digite seu email:");
   const whatsapp = prompt("Digite seu WhatsApp:");
   if (!email || !whatsapp) {
     alert("Preencha todos os dados");
     return;
   }
   await fetch("https://cs-store-api-production.up.railway.app/aviso", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       produto_id: produto.id,
       tamanho,
       email,
       whatsapp,
     }),
   });
   alert("🔔 Aviso cadastrado com sucesso!");
 };
 // ============================
 // ⭐ FEEDBACK
 // ============================
 const enviarFeedback = async () => {
   const qualidade = prompt("Qualidade do tecido (1 a 5):");
   const preco = prompt("Preço justo (1 a 5):");
   if (!qualidade || !preco) {
     alert("Preencha os dados");
     return;
   }
   await fetch("https://cs-store-api-production.up.railway.app/feedback", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       produto_id: produto.id,
       qualidade_tecido: Number(qualidade),
       preco_justo: Number(preco),
     }),
   });
   alert("⭐ Obrigado pelo feedback!");
 };
 return (
<div
     style={{
       border: "1px solid #eee",
       padding: "10px",
       borderRadius: "10px",
     }}
>
     {/* IMAGEM */}
<img
       src={produto.imagem}
       style={{
         width: "100%",
         height: "200px",
         objectFit: "cover",
       }}
     />
     {/* NOME */}
<h3>{produto.nome}</h3>
     {/* PREÇO */}
<div>
       {produto.preco_antigo && (
<span
           style={{
             textDecoration: "line-through",
             marginRight: "8px",
             color: "#999",
           }}
>
           R$ {produto.preco_antigo}
</span>
       )}
<strong>R$ {produto.preco}</strong>
</div>
     {/* TAMANHOS */}
<div style={{ marginTop: "10px" }}>
       {produto.variacoes?.map((v: any, i: number) => (
<button
           key={i}
           disabled={!v.disponivel}
           onClick={() => setTamanho(v.tamanho)}
           style={{
             marginRight: "5px",
             marginTop: "5px",
             padding: "5px",
             background: tamanho === v.tamanho ? "black" : "#eee",
             color: tamanho === v.tamanho ? "white" : "black",
             border:
               tamanho === v.tamanho
                 ? "2px solid black"
                 : "1px solid #ccc",
             cursor: v.disponivel ? "pointer" : "not-allowed",
             opacity: v.disponivel ? 1 : 0.4,
           }}
>
           {v.tamanho}
</button>
       ))}
</div>
     {/* TAMANHO SELECIONADO */}
     {tamanho && (
<p style={{ fontSize: "12px", marginTop: "5px" }}>
         Tamanho selecionado: <strong>{tamanho}</strong>
</p>
     )}
     {/* BOTÃO COMPRAR */}
<button
       onClick={comprar}
       style={{
         width: "100%",
         marginTop: "10px",
         background: tamanho ? "black" : "#aaa",
         color: "white",
         padding: "8px",
         border: "none",
         cursor: tamanho ? "pointer" : "not-allowed",
       }}
>
       🔥 Comprar agora
</button>
     {/* PERSONALIZAR */}
<a
       href={`https://wa.me/5511972734037?text=${encodeURIComponent(
         `Quero personalizar: ${produto.nome}`
       )}`}
       target="_blank"
>
<button style={{ width: "100%", marginTop: "5px" }}>
         🎨 Personalizar
</button>
</a>
     {/* AVISO */}
<button
       onClick={enviarAviso}
       style={{ width: "100%", marginTop: "5px" }}
>
       🔔 Avise-me
</button>
     {/* FEEDBACK */}
<button
       onClick={enviarFeedback}
       style={{ width: "100%", marginTop: "5px" }}
>
       ⭐ Avaliar produto
</button>
</div>
 );
}
