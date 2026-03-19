import Link from "next/link";
export default function Home() {
 return (
<main>
     {/* HERO */}
<section style={{
       height: "100vh",
       backgroundImage: "url('/bg.jpg')",
       backgroundSize: "cover",
       backgroundPosition: "center",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       textAlign: "center",
       color: "white"
     }}>
<div>
<p style={{ color: "#FFD700" }}>NOVA COLEÇÃO 2026</p>
<h1 style={{ fontSize: "60px" }}>
           VISTA O <br />
<span style={{ color: "#FFD700" }}>QUE TE REPRESENTA</span>
</h1>
<p>Camisas personalizadas com qualidade premium.</p>
<div style={{ marginTop: "20px" }}>
<Link href="/catalogo">
<button style={{ marginRight: "10px" }}>VER CATÁLOGO</button>
</Link>
<a href="https://wa.me/5511972734037">
<button>PERSONALIZAR</button>
</a>
</div>
</div>
</section>
     {/* ⭐ AVALIAÇÃO */}
<section style={{ padding: "60px", textAlign: "center" }}>
<h2>★★★★★</h2>
<p>Mais de 500 clientes satisfeitos</p>
</section>
     {/* POR QUE ESCOLHER */}
<section style={{ padding: "60px", textAlign: "center" }}>
<h2>Por que escolher a CS Store?</h2>
<p>
         Trabalhamos com materiais premium, personalização exclusiva e foco total
         na experiência do cliente.
</p>
</section>
     {/* DESTAQUES */}
<section style={{ padding: "60px", textAlign: "center" }}>
<h2>Destaques da semana</h2>
<p>Brasil • Corinthians • Caixa personalizada</p>
</section>
     {/* SOBRE */}
<section style={{ padding: "60px", textAlign: "center" }}>
<h2>Mais que uma marca, um estúdio</h2>
<p>
         Criamos camisetas com identidade, estilo e personalidade para quem vive o futebol.
</p>
</section>
     {/* CTA FINAL */}
<section style={{ padding: "60px", textAlign: "center" }}>
<h2>Pronto para entrar em campo?</h2>
<a href="https://wa.me/5511972734037">
<button>FALAR NO WHATSAPP</button>
</a>
</section>
</main>
 );
}
