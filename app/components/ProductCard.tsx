"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ProductCard({ produto, isDetalhe = false }: any) {
 const router = useRouter();
 const [tamanho, setTamanho] = useState("");
 const [qualidade, setQualidade] = useState(5);
 const [preco, setPreco] = useState(5);
 // 👉 navegação (SÓ imagem + nome)
 const irParaProduto = () => {
   router.push(`/produto/${produto.id}`);
 };
 // 🛒 COMPRAR
 const comprar = (e: any) => {
   e.stopPropagation();
   if (!tamanho) {
     alert("⚠️ Selecione um tamanho");
     return;
   }
   const texto = `Quero comprar: ${produto.nome} | Tamanho: ${tamanho}`;
   window.open(
     `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`,
     "_blank"
   );
 };
 // 🔔 AVISO (SEM TRAVAR TAMANHO)
 const enviarAviso = async (e: any) => {
   e.stopPropagation();
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
 // ⭐ FEEDBACK (SÓ DETALHE)
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
 if (produto?.nome?.toLowerCase().includes("caixa")) {
   variacoes = [{ tamanho: "Único", disponivel: true }];
 }
 return (
<div style={{ maxWidth: "300px", margin: "auto" }}>
     {/* 🔥 IMAGEM (CLICÁVEL) */}
<div onClick={irParaProduto} style={{ cursor: "pointer" }}>
<img
         src={produto?.imagem || "/bg.jpg"}
         alt={produto?.nome}
         style={{
           width: "100%",
           height: "250px",
           objectFit: "cover",
           borderRadius: "10px",
         }}
       />
</div>
     {/* 🔥 NOME (CLICÁVEL) */}
<h3
       onClick={irParaProduto}
       style={{
         cursor: "pointer",
         marginTop: "10px",
         fontWeight: "bold",
       }}
>
       {produto?.nome}
</h3>
     {/* 💰 PREÇO */}
<div>
       {produto?.preco_antigo && (
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
<strong style={{ color: "#FFD700" }}>
         R$ {produto?.preco}
</strong>
</div>
     {/* 📏 TAMANHO */}
<select
       value={tamanho}
       onChange={(e) => setTamanho(e.target.value)}
       onClick={(e) => e.stopPropagation()}
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
     {/* 🛒 COMPRAR */}
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
     {/* 🔔 AVISO */}
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
     {/* ⭐ AVALIAÇÃO (SÓ NA PÁGINA INDIVIDUAL) */}
     {isDetalhe && (
<>
<h3 style={{ marginTop: "20px" }}>Avaliar produto</h3>
<select onChange={(e) => setQualidade(Number(e.target.value))}>
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
</>
     )}
</div>
 );
}
