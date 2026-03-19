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
         fontSize: "34px",
         fontWeight: "bold",
         letterSpacing: "1px",
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
         marginBottom: "25px",
         padding: "14px",
         width: "100%",
         borderRadius: "8px",
         border: "1px solid #222",
         outline: "none",
         background: "#111",
         color: "white",
         fontSize: "14px",
         transition: "0.2s",
       }}
       onFocus={(e) =>
         (e.currentTarget.style.border = "1px solid #FFD700")
       }
       onBlur={(e) =>
         (e.currentTarget.style.border = "1px solid #222")
       }
     />
     {/* 🎯 FILTRO TAMANHO */}
<div style={{ marginBottom: "25px" }}>
       {["", "P", "M", "G", "GG"].map((t) => (
<button
           key={t}
           onClick={() => setTamanhoFiltro(t)}
           style={{
             marginRight: "8px",
             marginBottom: "8px",
             padding: "8px 16px",
             background: tamanhoFiltro === t ? "#FFD700" : "#111",
             color: tamanhoFiltro === t ? "black" : "white",
             border: "1px solid #333",
             borderRadius: "20px",
             cursor: "pointer",
             fontWeight: "bold",
             transition: "0.25s",
           }}
           onMouseEnter={(e) => {
             if (tamanhoFiltro !== t) {
               e.currentTarget.style.background = "#222";
             }
           }}
           onMouseLeave={(e) => {
             if (tamanhoFiltro !== t) {
               e.currentTarget.style.background = "#111";
             }
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
           "repeat(auto-fill, minmax(240px, 1fr))",
         gap: "25px",
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
     {/* 🧾 SEM PRODUTO */}
     {filtrados.length === 0 && (
<p
         style={{
           marginTop: "50px",
           opacity: 0.6,
           textAlign: "center",
         }}
>
         Nenhum produto encontrado.
</p>
     )}
</div>
 );
}
