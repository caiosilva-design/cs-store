"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ProductCard({ produto, isDetalhe = false }: any) {
 const router = useRouter();
 const [tamanho, setTamanho] = useState("");
 const [qualidade, setQualidade] = useState(5);
 const [preco, setPreco] = useState(5);
 // 👉 ir para página do produto
 const irParaProduto = () => {
   router.push(`/produto/${produto.id}`);
 };
 // 🛒 COMPRAR
 const comprar = () => {
   if (!tamanho) {
     alert("⚠️ Selecione um tamanho");
     return;
   }
   const texto = `Quero comprar: ${produto.nome} | Tamanho: ${tamanho}`;
   window.open(
     `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`
   );
 };
 // 🔔 AVISO (SEM TRAVAR TAMANHO)
 const enviarAviso = async () => {
   const tamanhoDesejado = prompt("Qual tamanho você deseja?");
   const email = prompt("Digite seu email:");
   const whatsapp = prompt("Digite seu WhatsApp:");
   if (!tamanhoDesejado || !email || !whatsapp) {
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
   alert("⭐ Feedback enviado!");
 };
 // 💥 REGRA CAIXA
 let variacoes = produto?.variacoes || [];
 if (produto.nome?.toLowerCase().includes("caixa")) {
   variacoes = [{ tamanho: "Único", disponivel: true }];
 }
 return (
<div style={{ maxWidth: "300px", margin: "auto" }}>
     {/* 🔥 CLICK SÓ NA IMAGEM */}
<div onClick={irParaProduto} style={{ cursor: "pointer" }}>
<img
         src={produto.imagem || "/bg.jpg"}
         style={{
           width: "100%",
           height: "250px",
           objectFit: "cover",
           borderRadius: "10px",
         }}
       />
</div>
     {/* 🔥 CLICK SÓ NO NOME */}
<h3
       onClick={irParaProduto}
       style={{ cursor: "pointer", marginTop: "10px" }}
>
       {produto.nome}
</h3>
     {/* PREÇO */}
<div>
       {produto.preco_antigo && (
<span
           style={{
             textDecoration: "line-through",
             marginRight: "10px",
             color: "#999",
           }}
>
           R$ {produto.preco_antigo}
</span>
       )}
<strong style={{ color: "#FFD700" }}>R$ {produto.preco}</strong>
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
     {/* BOTÃO COMPRAR (DOURADO 🔥) */}
<button
       onClick={comprar}
       style={{
         width: "100%",
         marginTop: "10px",
         background: "#FFD700",
         color: "black",
         padding: "10px",
         border: "none",
         fontWeight: "bold",
         cursor: "pointer",
       }}
>
       Comprar
</button>
     {/* AVISO */}
<button
       onClick={enviarAviso}
       style={{
         width: "100%",
         marginTop: "5px",
         padding: "8px",
       }}
>
       Avise-me
</button>
     {/* ⭐ SÓ NA PÁGINA DETALHE */}
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
<button onClick={enviarFeedback} style={{ marginTop: "10px" }}>
           Enviar avaliação
</button>
</>
     )}
</div>
 );
}
