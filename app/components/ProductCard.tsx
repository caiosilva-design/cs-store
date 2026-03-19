"use client";
import { useState } from "react";
export default function ProductCard({ produto, isDetalhe = false }: any) {
 const [tamanho, setTamanho] = useState("");
 const [qualidade, setQualidade] = useState(5);
 const [preco, setPreco] = useState(5);
 // 🛒 COMPRAR
 const comprar = (e: any) => {
   e.stopPropagation();
   if (!tamanho) {
     alert("⚠️ Selecione um tamanho");
     return;
   }
   const texto = `Quero comprar: ${produto.nome} | Tamanho: ${tamanho}`;
   window.open(
     `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`
   );
 };
 // 🔔 AVISO (NOVO FLUXO)
 const enviarAviso = async (e: any) => {
   e.stopPropagation();
   const tamanhoDesejado = prompt("Qual tamanho você gostaria?");
   if (!tamanhoDesejado) return;
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
       tamanho: tamanhoDesejado,
       email,
       whatsapp,
     }),
   });
   alert("🔔 Aviso cadastrado com sucesso!");
 };
 // ⭐ FEEDBACK
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
 // 💥 REGRA CAIXA
 let variacoes = produto.variacoes || [];
 if (produto.nome.toLowerCase().includes("caixa")) {
   variacoes = [{ tamanho: "Único", disponivel: true }];
 }
 return (
<div style={{ maxWidth: "400px", margin: "auto" }}>
     {/* IMAGEM */}
<img
       src={produto.imagem}
       style={{
         width: "100%",
         height: "300px",
         objectFit: "cover",
         borderRadius: "10px",
       }}
     />
<h2>{produto.nome}</h2>
     {/* PREÇO */}
<div>
       {produto.preco_antigo && (
<span style={{ textDecoration: "line-through", marginRight: "10px" }}>
           R$ {produto.preco_antigo}
</span>
       )}
<strong>R$ {produto.preco}</strong>
</div>
     {/* TAMANHO */}
<select
       value={tamanho}
       onChange={(e) => setTamanho(e.target.value)}
       style={{ marginTop: "10px", width: "100%", padding: "8px" }}
>
<option value="">Selecione o tamanho</option>
       {variacoes.map((v: any, i: number) => (
<option key={i} value={v.tamanho} disabled={!v.disponivel}>
           {v.tamanho}
</option>
       ))}
</select>
     {/* BOTÕES */}
<button onClick={comprar} style={{ width: "100%", marginTop: "10px" }}>
       Comprar
</button>
<button onClick={enviarAviso} style={{ width: "100%", marginTop: "5px" }}>
       Avise-me
</button>
     {/* ⭐ SÓ NO DETALHE */}
     {isDetalhe && (
<>
<h3 style={{ marginTop: "20px" }}>Avaliar produto</h3>
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
