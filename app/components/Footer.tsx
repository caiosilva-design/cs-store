export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid #222",
        padding: "40px",
        marginTop: "60px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {/* MARCA */}
        <div>
          <h2 style={{ color: "#d4af37" }}>CRIA STUDIO</h2>
          <p
            style={{
              color: "#aaa",
              maxWidth: "300px",
              lineHeight: 1.6,
              marginTop: "8px",
            }}
          >
            Camisas personalizadas com qualidade premium. Vista o que te
            representa com estilo único e 100% autêntico.
          </p>
          
            href="https://instagram.com/criastudio.store"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#d4af37",
              fontSize: "14px",
              marginTop: "12px",
              textDecoration: "none",
            }}
          >
            📸 @criastudio.store
          </a>
        </div>

        {/* NAVEGAÇÃO */}
        <div>
          <h4 style={{ color: "#d4af37", marginBottom: "12px" }}>
            Navegação
          </h4>
          {[
            { label: "Início", href: "/" },
            { label: "Catálogo", href: "/produtos" },
            { label: "Favoritos", href: "/favoritos" },
            { label: "Sobre", href: "/sobre" },
            { label: "Contato", href: "/contato" },
          ].map((item) => (
            <p key={item.href} style={{ marginBottom: "6px" }}>
              <a href={item.href} style={linkStyle}>
                {item.label}
              </a>
            </p>
          ))}
        </div>

        {/* CONTATO */}
        <div>
          <h4 style={{ color: "#d4af37", marginBottom: "12px" }}>
            Contato
          </h4>
          <p style={{ marginBottom: "6px" }}>📍 São Paulo, SP</p>
          <p style={{ marginBottom: "6px" }}>
            
              href="https://wa.me/5511972734037"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              📞 (11) 97273-4037
            </a>
          </p>
          <p>
            
              href="https://instagram.com/criastudio.store"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              📸 @criastudio.store
            </a>
          </p>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#666",
          fontSize: "13px",
        }}
      >
        © 2026 CRIA STUDIO. Todos os direitos reservados.
        <br />
        CNPJ: 65.796.594/0001-34
      </div>
    </footer>
  );
}

const linkStyle: React.CSSProperties = {
  color: "#ccc",
  textDecoration: "none",
};
