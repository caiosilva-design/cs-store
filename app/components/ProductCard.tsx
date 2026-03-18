"use client";
export default function ProductCard({ produto }: any) {
 return (
<div style={{ padding: "10px", border: "1px solid #eee" }}>
<img src={produto.imagem} style={{ width: "100%" }} />
<h3>{produto.nome}</h3>
     {/* PREÇO */}
<div style={{ marginTop: "5px" }}>
       {produto.preco_antigo && (
<span
           style={{
             textDecoration: "line-through",
             color: "#999",
             marginRight: "8px",
             fontSize: "14px",
           }}
>
           R$ {produto.preco_antigo}
</span>
       )}
<span style={{ fontWeight: "bold", color: "#000" }}>
         R$ {produto.preco}
</span>
</div>
</div>
 );
}
