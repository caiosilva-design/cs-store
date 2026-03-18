async function getProdutos() {
 const res = await fetch("https://SUA_API_AQUI/produtos", {
   cache: "no-store",
 });
 return res.json();
}
export default async function Home() {
 const produtos = await getProdutos();
 return (
<div style={{ padding: "40px", fontFamily: "Arial" }}>
<h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
       🔥 CS STORE
</h1>
<div
       style={{
         display: "grid",
         gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
         gap: "20px",
       }}
>
       {produtos.map((p: any) => (
<div
           key={p.id}
           style={{
             border: "1px solid #eee",
             borderRadius: "10px",
             padding: "15px",
             boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
           }}
>
           {/* IMAGEM */}
<img
             src={p.imagem}
             alt={p.nome}
             style={{
               width: "100%",
               height: "200px",
               objectFit: "cover",
               borderRadius: "8px",
             }}
           />
           {/* NOME */}
<h2 style={{ fontSize: "16px", marginTop: "10px" }}>
             {p.nome}
</h2>
           {/* PREÇO */}
<p style={{ fontWeight: "bold", margin: "5px 0" }}>
             💰 R$ {p.preco}
</p>
           {/* TAMANHOS */}
<div>
<strong style={{ fontSize: "14px" }}>
               Tamanhos:
</strong>
<div
               style={{
                 display: "flex",
                 gap: "8px",
                 marginTop: "5px",
                 flexWrap: "wrap",
               }}
>
               {p.variacoes?.map((v: any, i: number) => (
<span
                   key={i}
                   style={{
                     padding: "5px 10px",
                     borderRadius: "5px",
                     fontSize: "12px",
                     border: "1px solid",
                     backgroundColor: v.disponivel ? "#fff" : "#eee",
                     color: v.disponivel ? "#000" : "#999",
                     textDecoration: v.disponivel ? "none" : "line-through",
                   }}
>
                   {v.tamanho}
</span>
               ))}
</div>
</div>
</div>
       ))}
</div>
</div>
 );
}
