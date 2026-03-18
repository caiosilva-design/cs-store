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
