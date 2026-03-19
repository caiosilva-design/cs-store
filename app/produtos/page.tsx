"use client";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
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
     .toLowerCase()
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
<h1>Catálogo</h1>
     {/* 🔎 BUSCA */}
<input
       placeholder="Buscar produto..."
       value={busca}
       onChange={(e) => setBusca(e.target.value)}
       style={{
         marginBottom: "20px",
         padding: "10px",
         width: "100%",
       }}
     />
     {/* 🎯 FILTRO TAMANHO */}
<div style={{ marginBottom: "20px" }}>
       {["", "P", "M", "G", "GG"].map((t) => (
<button
           key={t}
           onClick={() => setTamanhoFiltro(t)}
           style={{
             marginRight: "5px",
             padding: "8px",
             background:
               tamanhoFiltro === t ? "#FFD700" : "#222",
             color:
               tamanhoFiltro === t ? "black" : "white",
             border: "none",
             borderRadius: "5px",
             cursor: "pointer",
           }}
>
           {t || "Todos"}
</button>
       ))}
</div>
     {/* PRODUTOS */}
<div
       style={{
         display: "grid",
         gridTemplateColumns:
           "repeat(auto-fill, minmax(220px, 1fr))",
         gap: "20px",
       }}
>
       {filtrados.map((p: any) => (
<Link
           key={p.id}
           href={`/produto/${p.id}`}
           style={{ textDecoration: "none", color: "inherit" }}
>
<div
             style={{ cursor: "pointer" }}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = "scale(1.05)";
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = "scale(1)";
             }}
>
<ProductCard produto={p} />
</div>
</Link>
       ))}
</div>
</div>
 );
}
