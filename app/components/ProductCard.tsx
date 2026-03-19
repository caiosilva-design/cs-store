"use client";
import { useState } from "react";
import Link from "next/link";
export default function ProductCard({ produto }: any) {
 const [tamanho, setTamanho] = useState("");
 // 🛒 COMPRAR
 const comprar = (e: any) => {
   e.stopPropagation();
   if (!tamanho) {
     alert("⚠️ Selecione um tamanho primeiro");
     return;
   }
   const texto = `Quero comprar: ${produto.nome} | Tamanho: ${tamanho}`;
   window.open(
     `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`
   );
 };
 // 🔔 AVISO
 const enviarAviso = async (e: any) => {
   e.stopPropagation();
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
 // ⭐ FEEDBACK
 const enviarFeedback = async (e: any) => {
   e.stopPropagation();
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
<Link href={`/produto/${produto.id}`} style={{ textDecoration: "none" }}>
<div
       style={{
         border: "1px solid rgba(255,255,255,0.1)",
         padding: "12px",
         borderRadius: "12px",
         background: "rgba(255,255,255,0.03)",
         transition: "0.3s",
         cursor: "pointer",
       }}
>
       {/* IMAGEM */}
<img
         src={produto.imagem}
         style={{
           width: "100%",
           height: "200px",
           objectFit: "cover",
           borderRadius: "8px",
         }}
       />
       {/* NOME */}
<h3 style={{ color: "white" }}>{produto.nome}</h3>
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
<strong style={{ color: "#FFD700" }}>
           R$ {produto.preco}
</strong>
</div>
       {/* TAMANHOS */}
<div style={{ marginTop: "10px" }}>
         {produto.variacoes?.map((v: any, i: number) => (
<button
             key={i}
             disabled={!v.disponivel}
             onClick={(e) => {
               e.preventDefault();
               setTamanho(v.tamanho);
             }}
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
       {/* BOTÕES */}
<button
         onClick={comprar}
         style={{
           width: "100%",
           marginTop: "10px",
           background: tamanho ? "black" : "#aaa",
           color: "white",
           padding: "8px",
           border: "none",
         }}
>
         🔥 Comprar agora
</button>
<button onClick={enviarAviso} style={{ width: "100%", marginTop: "5px" }}>
         🔔 Avise-me
</button>
<button onClick={enviarFeedback} style={{ width: "100%", marginTop: "5px" }}>
         ⭐ Avaliar produto
</button>
</div>
</Link>
 );
}
