export default function Footer() {
 return (
<footer
     style={{
       background: "#0a0a0a",
       borderTop: "1px solid #222",
       padding: "40px",
       marginTop: "60px",
       color: "white"
     }}
>
<div
       style={{
         display: "flex",
         justifyContent: "space-between",
         flexWrap: "wrap",
         gap: "30px"
       }}
>
       {/* MARCA */}
<div>
<h2 style={{ color: "#d4af37" }}>CRIA STUDIO</h2>
<p style={{ color: "#aaa", maxWidth: "300px" }}>
           Camisas personalizadas com qualidade premium. Vista o que te
           representa com estilo único e 100% autêntico.
</p>
<a
           href="https://instagram.com/criastudio.store"
           target="_blank"
           style={{ color: "#d4af37", fontSize: "20px" }}
>
           📸 Instagram
</a>
</div>
       {/* NAVEGAÇÃO */}
<div>
<h4 style={{ color: "#d4af37" }}>Navegação</h4>
<p><a href="/" style={link}>Início</a></p>
<p><a href="/produtos" style={link}>Catálogo</a></p>
<p><a href="/sobre" style={link}>Sobre</a></p>
<p><a href="/contato" style={link}>Contato</a></p>
</div>
       {/* CONTATO */}
<div>
<h4 style={{ color: "#d4af37" }}>Contato</h4>
<p>📍 São Paulo, SP</p>
<p>📞 (11) 97273-4037</p>
<p>@criastudio.store</p>
</div>
</div>
<div style={{ textAlign: "center", marginTop: "30px", color: "#666" }}>
       © 2026 CRIA STUDIO. Todos os direitos reservados.
</div>
</footer>
 );
}
const link = {
 color: "#ccc",
 textDecoration: "none"
};
