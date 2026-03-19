"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function ProdutoPage() {
 const params = useParams();
 const [produto, setProduto] = useState<any>(null);
 const [tamanho, setTamanho] = useState("");
 const [qualidade, setQualidade] = useState("");
 const [preco, setPreco] = useState("");
 useEffect(() => {
   if (!params?.id) return;
   fetch(`https://cs-store-api-production.up.railway.app/produto/${params.id}`)
     .then((res) => res.json())
     .then((data) => {
       console.log("PRODUTO:", data);
       setProduto(data);
     });
 }, [params]);
 if (!produto) return <div style={{ padding: "40px" }}>Carregando...</div>;
 let variacoes = produto.variacoes || [];
 if (produto.nome?.toLowerCase().includes("caixa")) {
   variacoes = [{ tamanho: "Único", disponivel: true }];
 }
 return (
<main style={{ padding: "120px 20px", background: "#000", color: "white" }}>
     {/* IMAGEM */}
<img
       src={produto.imagem}
       style={{
         width: "400px",
         borderRadius: "10px",
       }}
     />
<h1>{produto.nome}</h1>
<h2 style={{ color: "#FFD700" }}>
       R$ {produto.preco}
</h2>
     {/* TAMANHO */}
<select
       value={tamanho}
       onChange={(e) => setTamanho(e.target.value)}
       style={{ marginTop: "20px", padding: "10px" }}
>
<option value="">Selecione o tamanho</option>
       {variacoes.map((v: any, i: number) => (
<option key={i} value={v.tamanho} disabled={!v.disponivel}>
           {v.tamanho}
</option>
       ))}
</select>
</main>
 );
}
