"use client";
import { useState } from "react";
export default function ProductCard({ produto }: any) {
 const [tamanho, setTamanho] = useState("");
 const linkCompra = `https://wa.me/5511972734037?text=Quero%20comprar:%20${produto.nome}%20Tamanho:%20${tamanho}`;
 const linkPersonalizar = `https://wa.me/5511972734037?text=Quero%20personalizar:%20${produto.nome}`;
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
<span style={{ textDecoration: "line-through", marginRight: "8px" }}>
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
             color: tamanho === v.tamanho ? "white" : "black"
           }}
>
           {v.tamanho}
</button>
       ))}
</div>
     {/* BOTÕES */}
<a href={linkCompra} target="_blank">
<button style={{ width: "100%", marginTop: "10px", background: "black", color: "white" }}>
         Comprar no WhatsApp
</button>
</a>
<a href={linkPersonalizar} target="_blank">
<button style={{ width: "100%", marginTop: "5px" }}>
         🎨 Personalizar
</button>
</a>
<button style={{ width: "100%", marginTop: "5px" }}>
       🔔 Avise-me quando chegar
</button>
<button style={{ width: "100%", marginTop: "5px" }}>
       ⭐ Avaliar produto
</button>
</div>
 );
}
