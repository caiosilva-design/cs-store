"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function ProdutoPage() {
 const params = useParams();
 const [produto, setProduto] = useState<any>(null);
 const [tamanho, setTamanho] = useState("");
 const [qualidade, setQualidade] = useState("");
 const [preco, setPreco] = useState("");
 // 🔥 BUSCAR PRODUTO
 useEffect(() => {
   if (!params?.id) return;
   fetch(`https://cs-store-api-production.up.railway.app/produto/${params.id}`)
     .then((res) => res.json())
     .then((data) => {
       console.log("PRODUTO:", data);
       setProduto(data);
     });
 }, [params]);
 if (!produto)
   return <div style={{ padding: "40px", color: "white" }}>Carregando...</div>;
 // 💥 GARANTIA DE VARIAÇÕES
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
     `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`,
     "_blank"
   );
 };
 // 🔔 AVISO
 const aviso = async () => {
   const tamanhoDesejado = tamanho || prompt("Qual tamanho você deseja?");
   const email = prompt("Seu email:");
   const whatsapp = prompt("Seu WhatsApp:");
   if (!tamanhoDesejado || !email || !whatsapp) return;
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
<main
     style={{
       padding: "120px 20px",
       background: "#000",
       color: "white",
       minHeight: "100vh",
     }}
>
     {/* IMAGEM */}
<img
       src={produto.imagem || "/bg.jpg"}
       alt={produto.nome}
       style={{
         width: "400px",
         borderRadius: "10px",
       }}
     />
     {/* NOME */}
<h1 style={{ marginTop: "20px" }}>{produto.nome}</h1>
     {/* PREÇO */}
<h2 style={{ color: "#FFD700" }}>
       R$ {produto.preco}
</h2>
     {/* TAMANHO */}
<select
       value={tamanho}
       onChange={(e) => setTamanho(e.target.value)}
       style={{
         marginTop: "20px",
         padding: "10px",
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
     {/* BOTÕES */}
<button
       onClick={comprar}
       style={{
         display: "block",
         marginTop: "20px",
         background: "#FFD700",
         color: "black",
         padding: "12px",
         border: "none",
         fontWeight: "bold",
         cursor: "pointer",
       }}
>
       Comprar
</button>
<button
       onClick={aviso}
       style={{
         display: "block",
         marginTop: "10px",
         padding: "10px",
       }}
>
       Avisar quando disponível
</button>
     {/* AVALIAÇÃO */}
<div style={{ marginTop: "30px" }}>
<h3>Avaliar produto</h3>
<select onChange={(e) => setQualidade(e.target.value)}>
<option value="">Qualidade</option>
         {[1, 2, 3, 4, 5].map((n) => (
<option key={n} value={n}>
             {n}
</option>
         ))}
</select>
<select
         onChange={(e) => setPreco(e.target.value)}
         style={{ marginLeft: "10px" }}
>
<option value="">Preço justo</option>
         {[1, 2, 3, 4, 5].map((n) => (
<option key={n} value={n}>
             {n}
</option>
         ))}
</select>
<button
         onClick={feedback}
         style={{ display: "block", marginTop: "10px" }}
>
         Enviar avaliação
</button>
</div>
</main>
 );
}
