"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function ProdutoPage() {
 const params = useParams();
 const [produto, setProduto] = useState<any>(null);
 const [tamanho, setTamanho] = useState("");
 const [qualidade, setQualidade] = useState(5);
 const [preco, setPreco] = useState(5);
 // 🔥 BUSCAR PRODUTO
 useEffect(() => {
   if (!params?.id) return;
   fetch(`https://cs-store-api-production.up.railway.app/produto/${params.id}`)
     .then((res) => res.json())
     .then(setProduto);
 }, [params]);
 if (!produto)
   return <div style={{ padding: "40px", color: "white" }}>Carregando...</div>;
 // 💥 VARIAÇÕES
 let variacoes = produto.variacoes || [];
 if (produto.nome?.toLowerCase().includes("caixa")) {
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
   const tamanhoEscolhido =
     tamanho || prompt("Qual tamanho você quer? (P, M, G, GG)");
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
       tamanho: tamanhoEscolhido,
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
<main
     style={{
       background: "#000",
       color: "white",
       minHeight: "100vh",
       padding: "120px 40px",
     }}
>
<div
       style={{
         display: "grid",
         gridTemplateColumns: "1fr 1fr",
         gap: "60px",
         alignItems: "center",
       }}
>
       {/* 🖼 IMAGEM */}
<div style={{ borderRadius: "20px", overflow: "hidden" }}>
<img
           src={produto.imagem}
           alt={produto.nome}
           style={{
             width: "100%",
             transition: "0.4s",
           }}
           onMouseOver={(e) =>
             (e.currentTarget.style.transform = "scale(1.05)")
           }
           onMouseOut={(e) =>
             (e.currentTarget.style.transform = "scale(1)")
           }
         />
</div>
       {/* 📦 INFO */}
<div>
<h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
           {produto.nome}
</h1>
<h2 style={{ color: "#FFD700", fontSize: "28px" }}>
           R$ {produto.preco}
</h2>
         {/* 📏 TAMANHOS */}
<div style={{ marginTop: "30px" }}>
<p style={{ marginBottom: "10px", opacity: 0.7 }}>
             Selecione o tamanho
</p>
<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
             {variacoes.map((v: any, i: number) => (
<button
                 key={i}
                 disabled={!v.disponivel}
                 onClick={() => setTamanho(v.tamanho)}
                 style={{
                   padding: "10px 15px",
                   borderRadius: "6px",
                   border:
                     tamanho === v.tamanho
                       ? "2px solid #FFD700"
                       : "1px solid #444",
                   background:
                     tamanho === v.tamanho ? "#FFD700" : "transparent",
                   color:
                     tamanho === v.tamanho ? "black" : "white",
                   cursor: v.disponivel ? "pointer" : "not-allowed",
                   opacity: v.disponivel ? 1 : 0.3,
                   transition: "0.2s",
                 }}
>
                 {v.tamanho}
</button>
             ))}
</div>
</div>
         {/* 🛒 COMPRAR */}
<button
           onClick={comprar}
           style={{
             marginTop: "30px",
             width: "100%",
             padding: "15px",
             background: "#FFD700",
             color: "black",
             fontWeight: "bold",
             border: "none",
             borderRadius: "8px",
             cursor: "pointer",
             fontSize: "16px",
             transition: "0.2s",
           }}
>
           COMPRAR AGORA
</button>
         {/* 🔔 AVISE-ME */}
<button
           onClick={aviso}
           style={{
             marginTop: "10px",
             width: "100%",
             padding: "12px",
             background: "transparent",
             color: "#FFD700",
             border: "1px solid #FFD700",
             borderRadius: "8px",
             fontWeight: "bold",
             cursor: "pointer",
           }}
>
           Avise-me
</button>
         {/* ⭐ AVALIAÇÃO */}
<div style={{ marginTop: "40px" }}>
<h3>Avaliar produto</h3>
           {/* QUALIDADE */}
<div style={{ marginTop: "10px" }}>
<p style={{ fontSize: "14px", opacity: 0.7 }}>
               Qualidade do tecido
</p>
<select
               onChange={(e) => setQualidade(Number(e.target.value))}
               style={{
                 padding: "8px",
                 marginTop: "5px",
                 background: "#111",
                 color: "white",
                 border: "1px solid #333",
                 borderRadius: "6px",
               }}
>
               {[1, 2, 3, 4, 5].map((n) => (
<option key={n} value={n}>
                   {n} ⭐
</option>
               ))}
</select>
</div>
           {/* PREÇO */}
<div style={{ marginTop: "15px" }}>
<p style={{ fontSize: "14px", opacity: 0.7 }}>
               Preço justo
</p>
<select
               onChange={(e) => setPreco(Number(e.target.value))}
               style={{
                 padding: "8px",
                 marginTop: "5px",
                 background: "#111",
                 color: "white",
                 border: "1px solid #333",
                 borderRadius: "6px",
               }}
>
               {[1, 2, 3, 4, 5].map((n) => (
<option key={n} value={n}>
                   {n} ⭐
</option>
               ))}
</select>
</div>
<button
             onClick={enviarFeedback}
             style={{
               marginTop: "15px",
               padding: "10px",
               borderRadius: "6px",
               cursor: "pointer",
             }}
>
             Enviar avaliação
</button>
</div>
</div>
</div>
</main>
 );
}
