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
<div style={{ padding: "40px" }}>
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
               tamanhoFiltro === t ? "black" : "#eee",
             color:
               tamanhoFiltro === t ? "white" : "black",
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
           "repeat(auto-fill, minmax(200px, 1fr))",
         gap: "20px",
       }}
>
       {filtrados.map((p: any) => (
<ProductCard key={p.id} produto={p} />
       ))}
</div>
</div>
 );
}
