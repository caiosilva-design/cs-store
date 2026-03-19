"use client";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
export default function Produtos() {
 const [produtos, setProdutos] = useState([]);
 const [busca, setBusca] = useState("");
 const [tamanhoFiltro, setTamanhoFiltro] = useState("");
 useEffect(() => {
   fetch("https://cs-store-api-production.up.railway.app/produtos")
     .then((res) => res.json())
     .then(setProdutos);
 }, []);
 // 🔎 FILTRO
 const filtrados = produtos.filter((p: any) => {
   const matchNome = p.nome
     ?.toLowerCase()
     .includes(busca.toLowerCase());
   const matchTamanho = tamanhoFiltro
     ? p.variacoes?.some(
         (v: any) =>
           v.tamanho === tamanhoFiltro && v.disponivel
       )
     : true;
   return matchNome && matchTamanho;
 });
 return (
<div
     style={{
       padding: "120px 20px",
       background: "#000",
       color: "white",
       minHeight: "100vh",
     }}
>
     {/* TÍTULO */}
<h1
       style={{
         marginBottom: "20px",
         fontSize: "32px",
       }}
>
       Catálogo
</h1>
     {/* 🔎 BUSCA */}
<input
       placeholder="Buscar produto..."
       value={busca}
       onChange={(e) => setBusca(e.target.value)}
       style={{
         marginBottom: "20px",
         padding: "12px",
         width: "100%",
         borderRadius: "6px",
         border: "none",
         outline: "none",
       }}
     />
     {/* 🎯 FILTRO TAMANHO */}
<div style={{ marginBottom: "20px" }}>
       {["", "P", "M", "G", "GG"].map((t) => (
<button
           key={t}
           onClick={() => setTamanhoFiltro(t)}
           style={{
             marginRight: "8px",
             marginBottom: "8px",
             padding: "8px 14px",
             background: tamanhoFiltro === t ? "#FFD700" : "#222",
             color: tamanhoFiltro === t ? "black" : "white",
             border: "none",
             borderRadius: "6px",
             cursor: "pointer",
             fontWeight: "bold",
             transition: "0.2s",
           }}
>
           {t || "Todos"}
</button>
       ))}
</div>
     {/* 🛍️ GRID DE PRODUTOS */}
<div
       style={{
         display: "grid",
         gridTemplateColumns:
           "repeat(auto-fill, minmax(220px, 1fr))",
         gap: "20px",
       }}
>
       {filtrados.map((p: any) => (
<div
           key={p.id}
           style={{
             transition: "0.3s",
           }}
           onMouseEnter={(e) => {
             e.currentTarget.style.transform = "scale(1.05)";
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.transform = "scale(1)";
           }}
>
<ProductCard produto={p} />
</div>
       ))}
</div>
     {/* 🧾 CASO NÃO TENHA PRODUTO */}
     {filtrados.length === 0 && (
<p style={{ marginTop: "40px", opacity: 0.6 }}>
         Nenhum produto encontrado.
</p>
     )}
</div>
 );
}
