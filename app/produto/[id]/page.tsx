"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function ProdutoPage() {
 const params = useParams();
 const [produto, setProduto] = useState<any>(null);
 const [tamanho, setTamanho] = useState("");
 const [qualidade, setQualidade] = useState(5);
 const [preco, setPreco] = useState(5);
 useEffect(() => {
   fetch(`https://cs-store-api-production.up.railway.app/produto/${params.id}`)
     .then((res) => res.json())
     .then(setProduto);
 }, [params]);
 if (!produto) return <div style={{ color: "white" }}>Carregando...</div>;
 let variacoes = produto.variacoes || [];
 if (produto.nome.toLowerCase().includes("caixa")) {
   variacoes = [{ tamanho: "Único", disponivel: true }];
 }
 // 🛒 COMPRAR
 const comprar = () => {
   if (!tamanho) return alert("Selecione o tamanho");
   const texto = `Quero comprar: ${produto.nome} | ${tamanho}`;
   window.open(
     `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`
   );
 };
 // 🔔 AVISO
 const aviso = async () => {
   const tamanhoEscolhido =
     tamanho || prompt("Qual tamanho você quer?");
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
       }}
>
       {/* IMAGEM */}
<img
         src={produto.imagem}
         style={{
           width: "100%",
           borderRadius: "20px",
         }}
       />
       {/* INFO */}
<div>
<h1>{produto.nome}</h1>
<h2 style={{ color: "#FFD700" }}>
           R$ {produto.preco}
</h2>
         {/* TAMANHOS */}
<div style={{ marginTop: "20px" }}>
           {variacoes.map((v: any, i: number) => (
<button
               key={i}
               onClick={() => setTamanho(v.tamanho)}
               disabled={!v.disponivel}
               style={{
                 marginRight: "10px",
                 marginBottom: "10px",
                 padding: "10px 15px",
                 background:
                   tamanho === v.tamanho ? "#FFD700" : "#222",
                 color:
                   tamanho === v.tamanho ? "black" : "white",
                 border: "none",
                 borderRadius: "6px",
                 cursor: "pointer",
                 opacity: v.disponivel ? 1 : 0.3,
               }}
>
               {v.tamanho}
</button>
           ))}
</div>
         {/* COMPRAR */}
<button
           onClick={comprar}
           style={{
             marginTop: "20px",
             width: "100%",
             padding: "15px",
             background: "#FFD700",
             border: "none",
             fontWeight: "bold",
             cursor: "pointer",
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
             fontWeight: "bold",
             cursor: "pointer",
           }}
>
           Avise-me
</button>
         {/* ⭐ AVALIAÇÃO */}
<div style={{ marginTop: "30px" }}>
<h3>Avaliar produto</h3>
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
             style={{ display: "block", marginTop: "10px" }}
>
             Enviar avaliação
</button>
</div>
</div>
</div>
</main>
 );
}
