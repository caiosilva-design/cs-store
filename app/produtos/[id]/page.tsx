"use client";
import { useEffect, useState } from "react";
export default function ProdutoPage({ params }: any) {
 const [produto, setProduto] = useState<any>(null);
 const [tamanho, setTamanho] = useState("");
 const [qualidade, setQualidade] = useState("");
 const [preco, setPreco] = useState("");
 useEffect(() => {
   fetch(`https://cs-store-api-production.up.railway.app/produto/${params.id}`)
     .then(res => res.json())
     .then(data => setProduto(data));
 }, []);
 if (!produto) return <div style={{ padding: "40px" }}>Carregando...</div>;
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
   if (!tamanho) {
     alert("Escolha o tamanho");
     return;
   }
   const email = prompt("Seu email:");
   const whatsapp = prompt("Seu WhatsApp:");
   if (!email || !whatsapp) return;
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
   alert("Aviso cadastrado!");
 };
 // ⭐ FEEDBACK
 const feedback = async () => {
   if (!qualidade || !preco) {
     alert("Preencha a avaliação");
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
   alert("Avaliação enviada!");
 };
 return (
<main style={{ padding: "40px", color: "white" }}>
<img src={produto.imagem} style={{ width: "400px" }} />
<h1>{produto.nome}</h1>
<h2 style={{ color: "#FFD700" }}>
       R$ {produto.preco}
</h2>
     {/* TAMANHO */}
<select
       value={tamanho}
       onChange={(e) => setTamanho(e.target.value)}
       style={{ marginTop: "20px", padding: "10px" }}
>
<option value="">Selecione o tamanho</option>
       {produto.variacoes?.map((v: any, i: number) => (
<option key={i} value={v.tamanho} disabled={!v.disponivel}>
           {v.tamanho}
</option>
       ))}
</select>
     {/* BOTÕES */}
<button onClick={comprar} style={{ display: "block", marginTop: "20px" }}>
       Comprar
</button>
<button onClick={aviso} style={{ display: "block", marginTop: "10px" }}>
       Avisar quando disponível
</button>
     {/* AVALIAÇÃO */}
<div style={{ marginTop: "30px" }}>
<h3>Avaliar produto</h3>
<select onChange={(e) => setQualidade(e.target.value)}>
<option value="">Qualidade</option>
         {[1,2,3,4,5].map(n => (
<option key={n} value={n}>{n}</option>
         ))}
</select>
<select onChange={(e) => setPreco(e.target.value)}>
<option value="">Preço justo</option>
         {[1,2,3,4,5].map(n => (
<option key={n} value={n}>{n}</option>
         ))}
</select>
<button onClick={feedback} style={{ display: "block", marginTop: "10px" }}>
         Enviar avaliação
</button>
</div>
</main>
 );
}
