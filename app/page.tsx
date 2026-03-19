"use client";

export default function Home() {

  return (
<div>

      {/* HERO */}
<section style={hero}>
<div style={overlay} />
<div style={heroContent}>
<img

            src="/logo.png"

            style={{ width: "120px", marginBottom: "20px" }}

          />
<span style={badge}>● NOVA COLEÇÃO 2026</span>
<h1 style={title}>

            VISTA O <br />

            QUE <span style={{ color: "#d4af37" }}>TE REPRESENTA</span>
</h1>
<p style={subtitle}>

            Camisas personalizadas com qualidade premium. Estilo único e 100% autêntico.
</p>
<div style={{ marginTop: "20px" }}>
<a href="/produtos">
<button style={btnPrimary}>VER CATÁLOGO</button>
</a>
<a href="https://wa.me/5511972734037">
<button style={btnSecondary}>PERSONALIZAR</button>
</a>
</div>
</div>
</section>

      {/* AVALIAÇÃO */}
<section style={section}>
<h2>⭐ Avaliação dos clientes</h2>
<p style={{ color: "#aaa" }}>

          ⭐⭐⭐⭐⭐ 4.9/5 baseado em +120 clientes satisfeitos
</p>
</section>

      {/* POR QUE ESCOLHER */}
<section style={section}>
<h2 style={gold}>Por que escolher a CS Store?</h2>
<p style={text}>

          Trabalhamos com peças premium, acabamento de alta qualidade e um estilo único.

          Cada camisa é pensada para quem vive o futebol dentro e fora de campo.
</p>
</section>

      {/* DESTAQUES */}
<section style={section}>
<h2 style={gold}>Destaques da semana</h2>
<div style={grid}>
<Card nome="Camisa Brasil 2026" />
<Card nome="Camisa Corinthians" />
<Card nome="Caixa Personalizada" />
</div>
</section>

      {/* MARCA */}
<section style={section}>
<h2 style={gold}>Mais que uma marca, um estúdio</h2>
<p style={text}>

          Personalizamos camisetas com qualidade e estilo para quem respira futebol.

          Aqui você encontra identidade, autenticidade e atitude.
</p>
</section>

      {/* CTA FINAL */}
<section style={cta}>
<h2>Pronto para entrar em campo?</h2>
<a href="https://wa.me/5511972734037">
<button style={btnPrimary}>FALAR NO WHATSAPP</button>
</a>
</section>
</div>

  );

}

/* ================= ESTILOS ================= */

const hero = {

  position: "relative" as const,

  height: "90vh",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  backgroundImage:

    "url('https://images.unsplash.com/photo-1508098682722-e99c643e7f3b')",

  backgroundSize: "cover",

  backgroundPosition: "center"

};

const overlay = {

  position: "absolute" as const,

  width: "100%",

  height: "100%",

  background: "rgba(0,0,0,0.7)"

};

const heroContent = {

  position: "relative" as const,

  textAlign: "center" as const,

  maxWidth: "600px"

};

const title = {

  fontSize: "48px",

  fontWeight: "bold"

};

const subtitle = {

  marginTop: "10px",

  color: "#ccc"

};

const badge = {

  color: "#d4af37",

  fontSize: "14px"

};

const btnPrimary = {

  background: "#d4af37",

  color: "black",

  padding: "12px 20px",

  marginRight: "10px",

  borderRadius: "6px"

};

const btnSecondary = {

  background: "transparent",

  border: "1px solid #d4af37",

  color: "#d4af37",

  padding: "12px 20px",

  borderRadius: "6px"

};

const section = {

  padding: "60px 20px",

  textAlign: "center" as const

};

const text = {

  maxWidth: "600px",

  margin: "auto",

  color: "#aaa"

};

const gold = {

  color: "#d4af37"

};

const grid = {

  display: "flex",

  justifyContent: "center",

  gap: "20px",

  flexWrap: "wrap" as const

};

const cta = {

  padding: "80px 20px",

  textAlign: "center" as const

};

/* CARD */

function Card({ nome }: any) {

  return (
<div

      style={{

        background: "#111",

        padding: "20px",

        borderRadius: "10px",

        width: "200px"

      }}
>
<p>{nome}</p>
</div>

  );

}
