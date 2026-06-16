import Link from "next/link";
import { deveExibirProduto } from "./utils/preco";
import WhatsappButton from "./components/WhatsappButton";

export default async function Home() {
  const res = await fetch(
    "https://cs-store-api-production.up.railway.app/produtos",
    { cache: "no-store" }
  );
  const produtos = await res.json();
  const destaques = produtos
    .filter((p: any) => [148, 24, 75].includes(p.id))
    .filter((p: any) => deveExibirProduto(p.nome));

  return (
    <main style={{ color: "white", background: "#000" }}>
      <style>{`
        .hero-title {
          font-size: 70px;
          font-weight: bold;
          line-height: 1.1;
        }
        .hero-subtitle {
          margin-top: 20px;
          opacity: 0.7;
          font-size: 18px;
        }
        .hero-buttons {
          margin-top: 30px;
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .cta-title {
          font-size: 60px;
        }
        .diferenciais-grid {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }
        .diferencial-card {
          width: 260px;
          padding: 30px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .destaques-grid {
          margin-top: 50px;
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }
        .sobre-title {
          font-size: 50px;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 38px;
          }
          .hero-subtitle {
            font-size: 15px;
          }
          .cta-title {
            font-size: 30px;
          }
          .sobre-title {
            font-size: 32px;
          }
          .diferencial-card {
            width: 100%;
            max-width: 320px;
          }
          .destaques-grid {
            gap: 16px;
          }
        }
      `}</style>

      {/* HERO */}
      <section
        style={{
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
          padding: "20px",
        }}
      >
        <div>
          <p style={{ color: "#FFD700", letterSpacing: "3px", fontSize: "14px" }}>
            NOVA COLEÇÃO 2026
          </p>
          <h1 className="hero-title">
            VISTA O <br />
            <span style={{ color: "#FFD700" }}>QUE TE REPRESENTA</span>
          </h1>
          <p className="hero-subtitle">
            Camisas premium. Estilo único. Identidade própria.
          </p>
          <div className="hero-buttons">
            <Link href="/produtos">
              <button
                style={{
                  background: "#FFD700",
                  color: "black",
                  padding: "15px 30px",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                VER CATÁLOGO
              </button>
            </Link>
            <a href="https://wa.me/5511918610456?text=Ol%C3%A1%21+Quero+personalizar+uma+camisa">
              <button
                style={{
                  background: "transparent",
                  color: "#FFD700",
                  border: "1px solid #FFD700",
                  padding: "15px 30px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                PERSONALIZAR
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* AVALIAÇÃO */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "30px", color: "#FFD700", letterSpacing: "6px" }}>
          ★★★★★
        </h2>
        <p style={{ opacity: 0.7 }}>Mais de 5000 clientes satisfeitos</p>
      </section>

      {/* DIFERENCIAIS */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "40px", marginBottom: "50px" }}>
          Por que escolher a CS Store?
        </h2>
        <div className="diferenciais-grid">
          {[
            {
              icone: "🏆",
              titulo: "Qualidade Premium",
              desc: "Tecidos de alto padrão com acabamento impecável. Enviamos fotos e vídeos reais do produto antes do envio.",
            },
            {
              icone: "🚚",
              titulo: "Entrega para Todo o Brasil",
              desc: "Enviamos para qualquer estado com rastreamento. Prazo médio de 7 a 12 dias úteis após confirmação do pedido.",
            },
            {
              icone: "✏️",
              titulo: "Personalização Exclusiva",
              desc: "Coloque seu nome e número em qualquer camisa. Designs únicos criados especialmente para você.",
            },
          ].map((item, i) => (
            <div key={i} className="diferencial-card">
              <p style={{ fontSize: "30px", marginBottom: "10px" }}>{item.icone}</p>
              <h3 style={{ marginBottom: "10px" }}>{item.titulo}</h3>
              <p style={{ opacity: 0.6, fontSize: "14px", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DESTAQUES */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "40px" }}>Destaques da semana</h2>
        <div className="destaques-grid">
          {destaques.map((item: any) => {
            const promo = item.preco;
            const original = item.preco_antigo;
            const emPromocao = original && original > promo;
            return (
              <Link key={item.id} href={`/produto/${item.id}`} className="cardProduto">
                <img
                  src={`/api/image?url=${encodeURIComponent(item.imagem)}`}
                  alt={item.nome}
                />
                <div className="overlay" />
                {emPromocao && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      background: "#FFD700",
                      color: "black",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "3px 8px",
                      borderRadius: "20px",
                      zIndex: 3,
                    }}
                  >
                    PROMOÇÃO
                  </div>
                )}
                <span>{item.nome}</span>
                <div className="preco" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  R$ {promo}
                  {emPromocao && (
                    <span style={{ textDecoration: "line-through", color: "#aaa", fontSize: "13px", fontWeight: "normal" }}>
                      R$ {original}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SOBRE */}
      <section
        style={{
          padding: "100px 20px",
          textAlign: "center",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <h2 className="sobre-title">
          Mais que uma marca,<br />
          <span style={{ color: "#FFD700" }}>um estúdio</span>
        </h2>
        <p style={{ marginTop: "20px", fontSize: "18px", opacity: 0.7 }}>
          Criamos camisetas com identidade, estilo e personalidade para
          quem vive o futebol dentro e fora de campo.
        </p>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 20px", textAlign: "center" }}>
        <h2 className="cta-title">PRONTO PARA ENTRAR EM CAMPO?</h2>
        <p style={{ margin: "20px 0", opacity: 0.7 }}>
          Personalize agora e receba em casa.
        </p>
        <a href="https://wa.me/5511918610456?text=Ol%C3%A1%21+Quero+fazer+um+pedido+na+CS+Store">
          <button className="btnGold">FALAR NO WHATSAPP →</button>
        </a>
      </section>

      <WhatsappButton />
    </main>
  );
}
