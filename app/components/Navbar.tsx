export default function Navbar() {
 return (
<div
     style={{
       display: "flex",
       justifyContent: "space-between",
       padding: "20px",
       borderBottom: "1px solid #eee",
     }}
>
<strong>🔥 CS STORE</strong>
<div style={{ display: "flex", gap: "20px" }}>
<a href="/">Início</a>
<a href="/produtos">Produtos</a>
<a href="/sobre">Sobre</a>
</div>
</div>
 );
}