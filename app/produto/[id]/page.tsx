"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function ProdutoPage() {
 const params = useParams();
 const [produto, setProduto] = useState<any>(null);
 const [tamanho, setTamanho] = useState("");
 useEffect(() => {
   fetch(`https://cs-store-api-production.up.railway.app/produto/${params.id}`)
     .then((res) => res.json())
     .then(setProduto);
 }, [params]);
 if (!produto) return <div style={{ color: "white" }}>Carregando...</div>;
 let variacoes = produto.variacoes || [];
 if (produto.nome.toLowerCase().includes("caixa")) {
   variacoes = [{ tamanho: "Único", disponivel: true }];
 }
 const comprar = () => {
   if (!tamanho) return alert("Selecione o tamanho");
   const texto = `Quero comprar: ${produto.nome} | ${tamanho}`;
   window.open(
     `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`
   );
 };
 return (
<main
     style={{
       background: "#000",
       color: "white",
       minHeight: "100vh",
       padding: "120px 40px",
     }}
>
<div
       style={{
         display: "grid",
         gridTemplateColumns: "1fr 1fr",
         gap: "60px",
       }}
>
<img
         src={produto.imagem}
         style={{
           width: "100%",
           borderRadius: "20px",
           transition: "0.3s",
         }}
       />
<div>
<h1>{produto.nome}</h1>
<h2 style={{ color: "#FFD700" }}>
           R$ {produto.preco}
</h2>
<div style={{ marginTop: "20px" }}>
           {variacoes.map((v: any, i: number) => (
<button
               key={i}
               onClick={() => setTamanho(v.tamanho)}
               disabled={!v.disponivel}
               style={{
                 marginRight: "10px",
                 padding: "10px",
                 background:
                   tamanho === v.tamanho ? "#FFD700" : "#222",
                 color:
                   tamanho === v.tamanho ? "black" : "white",
                 border: "none",
                 cursor: "pointer",
               }}
>
               {v.tamanho}
</button>
           ))}
</div>
<button
           onClick={comprar}
           style={{
             marginTop: "30px",
             width: "100%",
             padding: "15px",
             background: "#FFD700",
             border: "none",
             fontWeight: "bold",
             cursor: "pointer",
           }}
>
           COMPRAR AGORA
</button>
</div>
</div>
</main>
 );
}
