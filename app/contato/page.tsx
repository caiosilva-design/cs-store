export default function Contato() {
 return (
<div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
<h1>Contato</h1>
<p style={{ marginTop: "20px" }}>
       Fale com a gente para dúvidas, pedidos ou suporte.
</p>
<div style={{ marginTop: "30px" }}>
<p><strong>📲 WhatsApp:</strong> (11) 97273-4037</p>
<p>
<strong>📸 Instagram:</strong>{" "}
<a href="https://instagram.com/criastudio.store" target="_blank">
           @criastudio.store
</a>
</p>
</div>
<hr style={{ margin: "30px 0" }} />
<h3>Ou envie uma mensagem:</h3>
<form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
<input placeholder="Seu nome" />
<input placeholder="Seu email" />
<input placeholder="WhatsApp" />
<textarea placeholder="Mensagem..." />
<button style={{
         background: "black",
         color: "white",
         padding: "10px",
         border: "none",
         cursor: "pointer"
       }}>
         Enviar
</button>
</form>
</div>
 );
}