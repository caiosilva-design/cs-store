export default function Navbar() {
 return (
<>
<div style={{
       background: "black",
       color: "white",
       textAlign: "center",
       padding: "5px",
       fontSize: "12px"
     }}>
       🚚 Frete rápido | 💬 Atendimento via WhatsApp | 🔥 Promoções ativas
</div>
<div style={{
       display: "flex",
       justifyContent: "space-between",
       padding: "20px 40px",
       borderBottom: "1px solid #eee"
     }}>
<strong>🔥 CS STORE</strong>
<div style={{ display: "flex", gap: "20px" }}>
<a href="/">Início</a>
<a href="/produtos">Catálogo</a>
<a href="/sobre">Sobre</a>
<a href="/contato">Contato</a>
<a href="https://instagram.com/criastudio.store" target="_blank">
           Instagram
</a>
</div>
</div>
</>
 );
}
