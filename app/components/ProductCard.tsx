"use client";
import { useState } from "react";
export default function ProductCard({ produto, isDetalhe = false }: any) {
 const [tamanho, setTamanho] = useState("");
 const [qualidade, setQualidade] = useState(5);
 const [preco, setPreco] = useState(5);
 // 🔥 REGRA CAIXA
 let variacoes = produto.variacoes || [];
 if (produto.nome.toLowerCase().includes("caixa")) {
   variacoes = [{ tamanho: "Único", disponivel: true }];
 }
 const tamanhosDisponiveis = variacoes.filter((v: any) => v.disponivel);
 // ============================
 // 🛒 COMPRAR
 // ============================
 const comprar = (e: any) => {
   e.stopPropagation();
   if (!tamanho) {
     alert("Selecione um tamanho");
     return;
   }
   const texto = `Quero comprar: ${produto.nome} | Tamanho: ${tamanho}`;
   window.open(
     `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`
   );
 };
 // ============================
 // 🔔 AVISO (INTELIGENTE)
 // ============================
 const enviarAviso = async (e: any) => {
   e.stopPropagation();
   if (tamanhosDisponiveis.length === 0) {
     alert("Produto indisponível no momento");
     return;
   }
   const tamanhoEscolhido = prompt(
     `Escolha o tamanho:\n${tamanhosDisponiveis
       .map((t: any) => t.tamanho)
       .join(" / ")}`
   );
   if (!tamanhoEscolhido) return;
   const email = prompt("Digite seu email:");
   const whatsapp = prompt("Digite seu WhatsApp:");
   await fetch("https://cs-store-api-production.up.railway.app/aviso", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       produto_id: produto.id,
       tamanho: tamanhoEscolhido,
       email,
       whatsapp,
     }),
   });
   alert("🔔 Aviso cadastrado!");
 };
 // ============================
 // ⭐ FEEDBACK
 // ============================
 const enviarFeedback = async (e: any) => {
   e.stopPropagation();
   await fetch("https://cs-store-api-production.up.railway.app/feedback", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       produto_id: produto.id,
       qualidade_tecido: qualidade,
       preco_justo: preco,
     }),
   });
   alert("⭐ Feedback enviado!");
 };
 return (
<div
     style={{
       border: "1px solid rgba(255,255,255,0.1)",
       padding: "12px",
       borderRadius: "12px",
       background: "#111",
       transition: "0.3s",
     }}
>
     {/* IMAGEM */}
<img
       src={produto.imagem}
       style={{
         width: "100%",
         height: "220px",
         objectFit: "cover",
         borderRadius: "10px",
       }}
     />
     {/* NOME */}
<h3 style={{ marginTop: "10px" }}>{produto.nome}</h3>
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
<strong style={{ color: "#FFD700" }}>R$ {produto.preco}</strong>
</div>
     {/* TAMANHO (SÓ NO DETALHE) */}
     {isDetalhe && (
<select
         value={tamanho}
         onChange={(e) => setTamanho(e.target.value)}
         style={{
           marginTop: "10px",
           width: "100%",
           padding: "8px",
         }}
>
<option value="">Selecione o tamanho</option>
         {variacoes.map((v: any, i: number) => (
<option key={i} value={v.tamanho} disabled={!v.disponivel}>
             {v.tamanho}
</option>
         ))}
</select>
     )}
     {/* BOTÕES */}
<button
       onClick={comprar}
       style={{
         width: "100%",
         marginTop: "10px",
         background: "#FFD700",
         color: "black",
         padding: "8px",
         border: "none",
         borderRadius: "6px",
         fontWeight: "bold",
         cursor: "pointer",
       }}
>
       Comprar
</button>
<button
       onClick={enviarAviso}
       style={{
         width: "100%",
         marginTop: "5px",
       }}
>
       Avise-me
</button>
     {/* ⭐ FEEDBACK SÓ NO DETALHE */}
     {isDetalhe && (
<>
<h4 style={{ marginTop: "15px" }}>Avaliar produto</h4>
<select onChange={(e) => setQualidade(Number(e.target.value))}>
           {[1, 2, 3, 4, 5].map((n) => (
<option key={n}>{n}</option>
           ))}
</select>
<select onChange={(e) => setPreco(Number(e.target.value))}>
           {[1, 2, 3, 4, 5].map((n) => (
<option key={n}>{n}</option>
           ))}
</select>
<button onClick={enviarFeedback}>
           Enviar avaliação
</button>
</>
     )}
</div>
 );
}
