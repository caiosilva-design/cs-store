"use client";
import { useState } from "react";
import Link from "next/link";
export default function ProductCard({ produto }: any) {
 const [tamanho, setTamanho] = useState("");
 let variacoes = produto.variacoes || [];
 if (produto.nome.toLowerCase().includes("caixa")) {
   variacoes = [{ tamanho: "Único", disponivel: true }];
 }
 const comprar = () => {
   if (!tamanho) return alert("Selecione o tamanho");
   const texto = `Quero comprar: ${produto.nome} | Tamanho: ${tamanho}`;
   window.open(
     `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`
   );
 };
 return (
<div
     style={{
       background: "#111",
       borderRadius: "15px",
       overflow: "hidden",
       transition: "0.3s",
     }}
     onMouseEnter={(e) =>
       (e.currentTarget.style.transform = "scale(1.03)")
     }
     onMouseLeave={(e) =>
       (e.currentTarget.style.transform = "scale(1)")
     }
>
     {/* LINK SÓ NA IMAGEM + NOME */}
<Link href={`/produto/${produto.id}`}>
<img
         src={produto.imagem}
         style={{
           width: "100%",
           height: "220px",
           objectFit: "cover",
           cursor: "pointer",
         }}
       />
</Link>
<div style={{ padding: "15px" }}>
<Link href={`/produto/${produto.id}`}>
<h3 style={{ cursor: "pointer" }}>{produto.nome}</h3>
</Link>
<p style={{ color: "#FFD700" }}>R$ {produto.preco}</p>
<select
         value={tamanho}
         onChange={(e) => setTamanho(e.target.value)}
         style={{
           width: "100%",
           padding: "8px",
           marginTop: "10px",
         }}
>
<option value="">Tamanho</option>
         {variacoes.map((v: any, i: number) => (
<option key={i} value={v.tamanho} disabled={!v.disponivel}>
             {v.tamanho}
</option>
         ))}
</select>
<button
         onClick={comprar}
         style={{
           width: "100%",
           marginTop: "10px",
           padding: "10px",
           background: "#FFD700",
           border: "none",
           fontWeight: "bold",
           cursor: "pointer",
         }}
>
         Comprar
</button>
</div>
</div>
 );
}
