async function getProdutos() {
 const res = await fetch("https://cs-store-api-production.up.railway.app/produtos", {
   cache: "no-store",
 });
 return res.json();
}
export default async function Home() {
 const produtos = await getProdutos();
 return (
<div style={{ padding: "20px" }}>
<h1>🔥 CS STORE</h1>
     {produtos.map((p: any) => (
<div
         key={p.id}
         style={{
           border: "1px solid #ccc",
           marginBottom: "10px",
           padding: "10px",
         }}
>
<h2>{p.nome}</h2>
<p>💰 R$ {p.preco}</p>
</div>
     ))}
</div>
 );
}
