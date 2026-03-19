import Link from "next/link";
export default async function Home() {
 // 🔥 BUSCA PRODUTOS DA API
 const res = await fetch("https://cs-store-api-production.up.railway.app/produtos", {
   cache: "no-store"
 });
 const produtos = await res.json();
 const destaques = produtos.filter((p: any) =>
   [148, 24, 75].includes(p.id)
 );
 return (
<main style={{ color: "white", background: "#000" }}>
     {/* HERO */}
<section style={{
       height: "100vh",
       backgroundImage: `
         linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.95)),
         url('/bg.jpg')
       `,
       backgroundSize: "cover",
       backgroundPosition: "center",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       textAlign: "center",
       padding: "20px"
     }}>
<div>
<p style={{ color: "#FFD700", letterSpacing: "3px", fontSize: "14px" }}>
           NOVA COLEÇÃO 2026
</p>
<h1 style={{ fontSize: "70px", fontWeight: "bold", lineHeight: "1.1" }}>
           VISTA O <br />
<span style={{ color: "#FFD700" }}>
             QUE TE REPRESENTA
</span>
</h1>
<p style={{ marginTop: "20px", opacity: 0.7, fontSize: "18px" }}>
           Camisas premium. Estilo único. Identidade própria.
</p>
<div style={{ marginTop: "30px" }}>
<Link href="/produtos">
<button style={{
               background: "#FFD700",
               color: "black",
               padding: "15px 30px",
               border: "none",
               borderRadius: "8px",
               marginRight: "10px",
               fontWeight: "bold",
               cursor: "pointer"
             }}>
               VER CATÁLOGO
</button>
</Link>
<a href="https://wa.me/5511972734037">
<button style={{
               background: "transparent",
               color: "#FFD700",
               border: "1px solid #FFD700",
               padding: "15px 30px",
               borderRadius: "8px",
               fontWeight: "bold",
               cursor: "pointer"
             }}>
               PERSONALIZAR
</button>
</a>
</div>
</div>
</section>
     {/* AVALIAÇÃO */}
<section style={{ padding: "100px 20px", textAlign: "center" }}>
<h2 style={{ fontSize: "30px", color: "#FFD700", letterSpacing: "6px" }}>
         ★★★★★
</h2>
<p style={{ opacity: 0.7 }}>
         Mais de 5000 clientes satisfeitos
</p>
</section>
     {/* DIFERENCIAIS */}
<section style={{ padding: "100px 20px", textAlign: "center" }}>
<h2 style={{ fontSize: "40px", marginBottom: "50px" }}>
         Por que escolher a CS Store?
</h2>
<div style={{
         display: "flex",
         justifyContent: "center",
         gap: "30px",
         flexWrap: "wrap"
       }}>
         {[
           "Qualidade Premium",
           "Entrega Rápida",
           "Personalização Exclusiva"
         ].map((item, i) => (
<div key={i} style={{
             width: "260px",
             padding: "30px",
             borderRadius: "12px",
             background: "rgba(255,255,255,0.03)",
             border: "1px solid rgba(255,255,255,0.1)"
           }}>
<h3>{item}</h3>
<p style={{ opacity: 0.6, fontSize: "14px" }}>
               Experiência única do início ao fim.
</p>
</div>
         ))}
</div>
</section>
     {/* DESTAQUES DINÂMICOS */}
<section style={{ padding: "100px 20px", textAlign: "center" }}>
<h2 style={{ fontSize: "40px" }}>
         Destaques da semana
</h2>
<div style={{
         marginTop: "50px",
         display: "flex",
         justifyContent: "center",
         gap: "30px",
         flexWrap: "wrap"
       }}>
         {destaques.map((item: any) => (
<Link
             key={item.id}
             href={`/produto/${item.id}`}
             className="cardProduto"
>
<img src={item.imagem} alt={item.nome} />
<div className="overlay" />
<span>{item.nome}</span>
<div className="preco">R$ {item.preco}</div>
</Link>
         ))}
</div>
</section>
     {/* SOBRE */}
<section style={{
       padding: "120px 20px",
       textAlign: "center",
       maxWidth: "800px",
       margin: "auto"
     }}>
<h2 style={{ fontSize: "50px" }}>
         Mais que uma marca,<br />
<span style={{ color: "#FFD700" }}>um estúdio</span>
</h2>
<p style={{
         marginTop: "20px",
         fontSize: "18px",
         opacity: 0.7
       }}>
         Criamos camisetas com identidade, estilo e personalidade
         para quem vive o futebol dentro e fora de campo.
</p>
</section>
     {/* CTA */}
<section style={{ padding: "120px 20px", textAlign: "center" }}>
<h2 style={{ fontSize: "60px" }}>
         PRONTO PARA ENTRAR EM CAMPO?
</h2>
<p style={{ margin: "20px 0", opacity: 0.7 }}>
         Personalize agora e receba em casa.
</p>
<a href="https://wa.me/5511972734037">
<button className="btnGold">
           FALAR NO WHATSAPP →
</button>
</a>
</section>
</main>
 );
}
