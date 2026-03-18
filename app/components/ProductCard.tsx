"use client";
import { useState } from "react";
export default function ProductCard({ produto }: any) {
 const [tamanho, setTamanho] = useState("");
 const linkCompra = `https://wa.me/5511972734037?text=Quero comprar: ${produto.nome} Tamanho: ${tamanho}`;
 const enviarAviso = async () => {
   const email = prompt("Digite seu email:");
   const whatsapp = prompt("Digite seu WhatsApp:");
   await fetch("https://SUA_API/aviso", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       produto_id: produto.id,
       tamanho,
       email,
       whatsapp
     })
   });
   alert("Aviso cadastrado!");
 };
 const enviarFeedback = async () => {
   const qualidade = prompt("Qualidade do tecido (1 a 5):");
   const preco = prompt("Preço justo (1 a 5):");
   await fetch("https://SUA_API/feedback", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       produto_id: produto.id,
       qualidade_tecido: Number(qualidade),
       preco_justo: Number(preco)
     })
   });
   alert("Obrigado pelo feedback!");
 };
 return (
<div style={{
     border: "1px solid #eee",
     padding: "10px",
     borderRadius: "10px"
   }}>
<img src={produto.imagem} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
<h3>{produto.nome}</h3>
     {/* PREÇO */}
<div>
       {produto.preco_antigo && (
<span style={{
           textDecoration: "line-through",
           marginRight: "8px",
           color: "#999"
         }}>
           R$ {produto.preco_antigo}
</span>
       )}
<strong>R$ {produto.preco}</strong>
</div>
     {/* TAMANHOS */}
<div style={{ marginTop: "10px" }}>
       {produto.variacoes?.map((v: any, i: number) => (
<button
           key={i}
           disabled={!v.disponivel}
           onClick={() => setTamanho(v.tamanho)}
           style={{
             marginRight: "5px",
             marginTop: "5px",
             padding: "5px",
             background: tamanho === v.tamanho ? "black" : "#eee",
             color: tamanho === v.tamanho ? "white" : "black",
             cursor: "pointer"
           }}
>
           {v.tamanho}
</button>
       ))}
</div>
     {/* COMPRAR */}
<a href={linkCompra} target="_blank">
<button style={{
         width: "100%",
         marginTop: "10px",
         background: "black",
         color: "white",
         padding: "8px",
         border: "none"
       }}>
         Comprar no WhatsApp
</button>
</a>
     {/* PERSONALIZAR */}
<a
       href={`https://wa.me/5511972734037?text=Quero personalizar: ${produto.nome}`}
       target="_blank"
>
<button style={{ width: "100%", marginTop: "5px" }}>
         🎨 Personalizar
</button>
</a>
     {/* AVISO */}
<button onClick={enviarAviso} style={{ width: "100%", marginTop: "5px" }}>
       🔔 Avise-me
</button>
     {/* FEEDBACK */}
<button onClick={enviarFeedback} style={{ width: "100%", marginTop: "5px" }}>
       ⭐ Avaliar produto
</button>
</div>
 );
}
