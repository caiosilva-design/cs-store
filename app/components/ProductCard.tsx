"use client";
import { useState } from "react";
export default function ProductCard({ produto }: any) {
 const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string | null>(null);
 const numero = "5511972734037";
 const gerarLink = () => {
   if (!tamanhoSelecionado) return "#";
   const texto = encodeURIComponent(
     `Quero comprar:\n${produto.nome}\nTamanho: ${tamanhoSelecionado}\nPreço: R$ ${produto.preco}`
   );
   return `https://wa.me/${numero}?text=${texto}`;
 };
 return (
<div
     style={{
       border: "1px solid #eee",
       borderRadius: "10px",
       padding: "15px",
     }}
>
<img
       src={produto.imagem}
       style={{
         width: "100%",
         height: "200px",
         objectFit: "cover",
         borderRadius: "8px",
       }}
     />
<h2>{produto.nome}</h2>
<p>💰 R$ {produto.preco}</p>
     {/* TAMANHOS */}
<div style={{ marginTop: "10px" }}>
<strong>Tamanhos:</strong>
<div style={{ display: "flex", gap: "8px", marginTop: "5px" }}>
         {produto.variacoes?.map((v: any, i: number) => (
<button
             key={i}
             disabled={!v.disponivel}
             onClick={() => setTamanhoSelecionado(v.tamanho)}
             style={{
               padding: "6px 10px",
               borderRadius: "5px",
               border:
                 tamanhoSelecionado === v.tamanho
                   ? "2px solid black"
                   : "1px solid #ccc",
               background: v.disponivel ? "#fff" : "#eee",
               cursor: v.disponivel ? "pointer" : "not-allowed",
             }}
>
             {v.tamanho}
</button>
         ))}
</div>
</div>
     {/* BOTÃO WHATSAPP */}
<a
       href={gerarLink()}
       target="_blank"
       style={{
         display: "block",
         marginTop: "15px",
         background: "#25D366",
         color: "#fff",
         textAlign: "center",
         padding: "10px",
         borderRadius: "8px",
         textDecoration: "none",
       }}
>
       Comprar no WhatsApp
</a>
</div>
 );
}