"use client";
import { useState } from "react";
import Link from "next/link";
export default function ProductCard({
 produto,
 isDetalhe = false,
}: any) {
 const [tamanho, setTamanho] = useState("");
 const [qualidade, setQualidade] = useState(5);
 const [preco, setPreco] = useState(5);
 let variacoes = produto.variacoes || [];
 // 💥 REGRA CAIXA
 if (produto.nome.toLowerCase().includes("caixa")) {
   variacoes = [{ tamanho: "Único", disponivel: true }];
 }
 // 🛒 COMPRAR
 const comprar = () => {
   if (!tamanho) {
     alert("Selecione o tamanho");
     return;
   }
   const texto = `Quero comprar: ${produto.nome} | Tamanho: ${tamanho}`;
   window.open(
     `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`
   );
 };
 // 🔔 AVISO
 const aviso = async () => {
   const tamanhoEscolhido = prompt(
     "Qual tamanho você quer? (P, M, G, GG)"
   );
   const email = prompt("Seu email:");
   const whatsapp = prompt("Seu WhatsApp:");
   if (!email || !whatsapp) {
     alert("Preencha os dados");
     return;
   }
   await fetch("https://cs-store-api-production.up.railway.app/aviso", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       produto_id: produto.id,
       tamanho: tamanhoEscolhido || "Não informado",
       email,
       whatsapp,
     }),
   });
   alert("🔔 Aviso cadastrado!");
 };
 // ⭐ FEEDBACK
 const enviarFeedback = async () => {
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
   alert("⭐ Avaliação enviada!");
 };
 return (
<div
     style={{
       background: "#111",
       borderRadius: "15px",
       overflow: "hidden",
       transition: "0.3s",
     }}
>
     {/* LINK SÓ NA IMAGEM */}
<Link href={`/produto/${produto.id}`}>
<img
         src={produto.imagem}
         style={{
           width: "100%",
           height: "220px",
           objectFit: "cover",
           cursor: "pointer",
         }}
       />
</Link>
<div style={{ padding: "15px" }}>
       {/* LINK SÓ NO NOME */}
<Link href={`/produto/${produto.id}`}>
<h3 style={{ cursor: "pointer" }}>{produto.nome}</h3>
</Link>
       {/* PREÇO */}
<p style={{ color: "#FFD700", fontWeight: "bold" }}>
         R$ {produto.preco}
</p>
       {/* TAMANHO */}
<select
         value={tamanho}
         onChange={(e) => setTamanho(e.target.value)}
         style={{
           width: "100%",
           padding: "8px",
           marginTop: "10px",
           background: "#000",
           color: "white",
           border: "1px solid #333",
           borderRadius: "6px",
         }}
>
<option value="">Selecione o tamanho</option>
         {variacoes.map((v: any, i: number) => (
<option key={i} value={v.tamanho} disabled={!v.disponivel}>
             {v.tamanho}
</option>
         ))}
</select>
       {/* COMPRAR */}
<button
         onClick={comprar}
         style={{
           width: "100%",
           marginTop: "10px",
           padding: "10px",
           background: "#FFD700",
           color: "black",
           border: "none",
           borderRadius: "6px",
           fontWeight: "bold",
           cursor: "pointer",
         }}
>
         Comprar
</button>
       {/* AVISO */}
<button
         onClick={aviso}
         style={{
           width: "100%",
           marginTop: "8px",
           padding: "10px",
           background: "transparent",
           color: "#FFD700",
           border: "1px solid #FFD700",
           borderRadius: "6px",
           fontWeight: "bold",
           cursor: "pointer",
         }}
>
         Avise-me
</button>
       {/* ⭐ AVALIAÇÃO (SÓ NO DETALHE) */}
       {isDetalhe && (
<div style={{ marginTop: "20px" }}>
<h4>Avaliar produto</h4>
<select
             onChange={(e) => setQualidade(Number(e.target.value))}
>
             {[1, 2, 3, 4, 5].map((n) => (
<option key={n}>{n}</option>
             ))}
</select>
<select
             onChange={(e) => setPreco(Number(e.target.value))}
             style={{ marginLeft: "10px" }}
>
             {[1, 2, 3, 4, 5].map((n) => (
<option key={n}>{n}</option>
             ))}
</select>
<button
             onClick={enviarFeedback}
             style={{
               display: "block",
               marginTop: "10px",
             }}
>
             Enviar avaliação
</button>
</div>
       )}
</div>
</div>
 );
}
