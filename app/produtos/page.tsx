import ProductCard from "../components/ProductCard";
async function getProdutos() {
 const res = await fetch("https://cs-store-api-production.up.railway.app/produtos", {
   cache: "no-store",
 });
 return res.json();
}
export default async function Produtos() {
 const produtos = await getProdutos();
 return (
<div style={{ padding: "40px" }}>
<h1>Produtos</h1>
<div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
       {produtos.map((p: any) => (
<ProductCard key={p.id} produto={p} />
       ))}
</div>
</div>
 );
}
