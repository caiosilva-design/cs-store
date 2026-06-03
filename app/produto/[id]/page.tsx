"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "../../context/StoreContext";

export default function ProdutoPage() {
  const params = useParams();
  const router = useRouter();

  const [produto, setProduto] = useState<any>(null);
  const [tamanho, setTamanho] = useState("");
  const [qualidade, setQualidade] = useState(5);
  const [preco, setPreco] = useState(5);
  const [adicionado, setAdicionado] = useState(false);

  const { addToCart, toggleFavorito, isFavorito } = useStore();

  useEffect(() => {
    if (!params?.id) return;
    fetch(
      `https://cs-store-api-production.up.railway.app/produto/${params.id}`
    )
      .then((res) => res.json())
      .then(setProduto);
  }, [params]);

  if (!produto)
    return (
      <div style={{ padding: "40px", color: "white" }}>Carregando...</div>
    );

  let variacoes = produto.variacoes || [];
  if (produto.nome?.toLowerCase().includes("caixa")) {
    variacoes = [{ tamanho: "Único", disponivel: true }];
  }

  const promo = produto.preco;
  const original = produto.preco_antigo;
  const emPromocao = original && original > promo;
  const favorito = isFavorito(produto.id);

  const handleAddToCart = () => {
    if (!tamanho) {
      alert("Selecione o tamanho");
      return;
    }
    addToCart({ ...produto, preco: promo }, tamanho);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  const comprar = () => {
    if (!tamanho) {
      alert("Selecione o tamanho");
      return;
    }
    const texto = `Quero comprar: ${produto.nome} | Tamanho: ${tamanho} | Valor: R$ ${promo}`;
    window.open(
      `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`
    );
  };

  const aviso = async () => {
    const tamanhoEscolhido =
      tamanho || prompt("Qual tamanho você quer? (P, M, G, GG)");
    const email = prompt("Seu email:");
    const whatsapp = prompt("Seu WhatsApp:");
    if (!email || !whatsapp) return;
    await fetch("https://cs-store-api-production.up.railway.app/aviso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        produto_id: produto.id,
        tamanho: tamanhoEscolhido,
        email,
        whatsapp,
      }),
    });
    alert("🔔 Aviso cadastrado!");
  };

  const enviarFeedback = async () => {
    await fetch("https://cs-store-api-production.up.railway.app/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        produto_id: produto.id,
        qualidade_tecido: qualidade,
        preco_justo: preco,
      }),
    });
    alert("⭐ Avaliação enviada!");
  };

  return (
    <main
      style={{
        background: "#000",
        color: "white",
        minHeight: "100vh",
        padding: "120px 40px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
      >
        {/* IMAGEM */}
        <div style={{ borderRadius: "20px", overflow: "hidden", position: "relative" }}>
          {emPromocao && (
            <div
              style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                background: "#FFD700",
                color: "black",
                fontSize: "11px",
                fontWeight: "bold",
                padding: "4px 10px",
                borderRadius: "20px",
                zIndex: 2,
              }}
            >
              PROMOÇÃO
            </div>
          )}
          <button
            onClick={() => toggleFavorito(produto.id)}
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              zIndex: 2,
              background: "rgba(0,0,0,0.6)",
              border: "none",
              borderRadius: "50%",
              width: "38px",
              height: "38px",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {favorito ? "❤️" : "🤍"}
          </button>
          <img
            src={`/api/image?url=${encodeURIComponent(produto.imagem)}`}
            alt={produto.nome}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              width: "100%",
              transition: "0.4s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          />
        </div>

        {/* DETALHES */}
        <div>
          <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
            {produto.nome}
          </h1>

          {/* PREÇO */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h2 style={{ color: "#FFD700", fontSize: "28px" }}>
              R$ {promo}
            </h2>
            {emPromocao && (
              <span
                style={{
                  color: "#666",
                  textDecoration: "line-through",
                  fontSize: "18px",
                }}
              >
                R$ {original}
              </span>
            )}
          </div>

          {/* TAMANHOS */}
          <div style={{ marginTop: "30px" }}>
            <p style={{ marginBottom: "10px", opacity: 0.7 }}>
              Selecione o tamanho
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {variacoes.map((v: any, i: number) => (
                <button
                  key={i}
                  disabled={!v.disponivel}
                  onClick={() => setTamanho(v.tamanho)}
                  style={{
                    padding: "10px 15px",
                    borderRadius: "6px",
                    border:
                      tamanho === v.tamanho
                        ? "2px solid #FFD700"
                        : "1px solid #444",
                    background:
                      tamanho === v.tamanho ? "#FFD700" : "transparent",
                    color: tamanho === v.tamanho ? "black" : "white",
                    cursor: v.disponivel ? "pointer" : "not-allowed",
                    opacity: v.disponivel ? 1 : 0.3,
                  }}
                >
                  {v.tamanho}
                </button>
              ))}
            </div>
          </div>

          {/* ADICIONAR AO CARRINHO */}
          <button
            onClick={handleAddToCart}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "15px",
              background: adicionado ? "#22c55e" : "#FFD700",
              color: "black",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              transition: "0.3s",
            }}
          >
            {adicionado ? "✓ Adicionado ao carrinho!" : "ADICIONAR AO CARRINHO"}
          </button>

          {/* COMPRAR AGORA */}
          <button
            onClick={comprar}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "15px",
              background: "transparent",
              color: "#FFD700",
              border: "1px solid #FFD700",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            COMPRAR AGORA VIA WHATSAPP
          </button>

          {/* PERSONALIZAR */}
          <button
            onClick={() =>
              router.push(`/produto/${produto.id}/personalizar`)
            }
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "15px",
              background: "transparent",
              color: "white",
              border: "1px solid #444",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            PERSONALIZAR CAMISA
          </button>

          {/* AVISE-ME */}
          <button
            onClick={aviso}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "12px",
              background: "transparent",
              color: "#555",
              border: "1px solid #333",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            🔔 Avise-me quando disponível
          </button>

          {/* AVALIAÇÃO */}
          <div style={{ marginTop: "40px", borderTop: "1px solid #222", paddingTop: "30px" }}>
            <h3 style={{ marginBottom: "16px" }}>Avaliar produto</h3>

            <div style={{ marginBottom: "12px" }}>
              <p style={{ fontSize: "14px", opacity: 0.7, marginBottom: "6px" }}>
                Qualidade do tecido
              </p>
              <select
                onChange={(e) => setQualidade(Number(e.target.value))}
                style={{
                  padding: "8px",
                  background: "#111",
                  color: "white",
                  border: "1px solid #333",
                  borderRadius: "6px",
                }}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} ⭐
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <p style={{ fontSize: "14px", opacity: 0.7, marginBottom: "6px" }}>
                Preço justo
              </p>
              <select
                onChange={(e) => setPreco(Number(e.target.value))}
                style={{
                  padding: "8px",
                  background: "#111",
                  color: "white",
                  border: "1px solid #333",
                  borderRadius: "6px",
                }}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} ⭐
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={enviarFeedback}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                background: "#111",
                color: "white",
                border: "1px solid #333",
                cursor: "pointer",
              }}
            >
              Enviar avaliação
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
