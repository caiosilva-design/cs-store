"use client";
import { useState } from "react";
import Link from "next/link";
import { useStore } from "../context/StoreContext";
import { calcularPreco } from "../utils/preco";

export default function ProductCard({ produto }: any) {
  const [tamanho, setTamanho] = useState("");
  const [adicionado, setAdicionado] = useState(false);
  const { addToCart, toggleFavorito, isFavorito } = useStore();
  const favorito = isFavorito(produto.id);
  const { original, promo, emPromocao } = calcularPreco(produto.nome);

  let variacoes = produto.variacoes || [];
  if (produto.nome.toLowerCase().includes("caixa")) {
    variacoes = [{ tamanho: "Único", disponivel: true }];
  }

  const handleAddToCart = () => {
    if (!tamanho) {
      alert("Selecione o tamanho");
      return;
    }
    addToCart({ ...produto, preco: promo }, tamanho);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  const comprarAgora = () => {
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
    const tamanhoEscolhido = prompt("Qual tamanho você quer? (P, M, G, GG)");
    const email = prompt("Seu email:");
    const whatsapp = prompt("Seu WhatsApp:");
    if (!email || !whatsapp) {
      alert("Preencha os dados");
      return;
    }
    await fetch("https://cs-store-api-production.up.railway.app/aviso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        produto_id: produto.id,
        tamanho: tamanhoEscolhido || "Não informado",
        email,
        whatsapp,
      }),
    });
    alert("🔔 Aviso cadastrado!");
  };

  return (
    <div
      style={{
        background: "#111",
        borderRadius: "15px",
        overflow: "hidden",
        transition: "0.3s",
        position: "relative",
      }}
    >
      {/* BOTÃO FAVORITO */}
      <button
        onClick={() => toggleFavorito(produto.id)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 2,
          background: "rgba(0,0,0,0.6)",
          border: "none",
          borderRadius: "50%",
          width: "34px",
          height: "34px",
          fontSize: "16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "0.2s",
        }}
      >
        {favorito ? "❤️" : "🤍"}
      </button>

      {/* BADGE PROMOÇÃO */}
      {emPromocao && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 2,
            background: "#FFD700",
            color: "black",
            fontSize: "10px",
            fontWeight: "bold",
            padding: "3px 8px",
            borderRadius: "20px",
            letterSpacing: "0.5px",
          }}
        >
          PROMOÇÃO
        </div>
      )}

      {/* IMAGEM — via proxy para esconder domínio do fornecedor */}
      <Link href={`/produto/${produto.id}`}>
        <img
          src={`/api/image?url=${encodeURIComponent(produto.imagem)}`}
          alt={produto.nome}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
      </Link>

      <div style={{ padding: "15px" }}>
        {/* NOME */}
        <Link href={`/produto/${produto.id}`}>
          <h3
            style={{
              cursor: "pointer",
              fontSize: "14px",
              lineHeight: 1.3,
              marginBottom: "8px",
            }}
          >
            {produto.nome}
          </h3>
        </Link>

        {/* PREÇO */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p
            style={{
              color: "#FFD700",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            R$ {promo}
          </p>
          {emPromocao && (
            <p
              style={{
                color: "#666",
                textDecoration: "line-through",
                fontSize: "13px",
              }}
            >
              R$ {original}
            </p>
          )}
        </div>

        {/* TAMANHO */}
        <select
          value={tamanho}
          onChange={(e) => setTamanho(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "10px",
            background: "#000",
            color: "white",
            border: "1px solid #333",
            borderRadius: "6px",
          }}
        >
          <option value="">Selecione o tamanho</option>
          {variacoes.map((v: any, i: number) => (
            <option key={i} value={v.tamanho} disabled={!v.disponivel}>
              {v.tamanho}
              {!v.disponivel ? " (Indisponível)" : ""}
            </option>
          ))}
        </select>

        {/* ADICIONAR AO CARRINHO */}
        <button
          onClick={handleAddToCart}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            background: adicionado ? "#22c55e" : "#FFD700",
            color: "black",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          {adicionado ? "✓ Adicionado!" : "Adicionar ao carrinho"}
        </button>

        {/* COMPRAR AGORA */}
        <button
          onClick={comprarAgora}
          style={{
            width: "100%",
            marginTop: "6px",
            padding: "10px",
            background: "transparent",
            color: "#FFD700",
            border: "1px solid #FFD700",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Comprar agora
        </button>

        {/* AVISE-ME */}
        <button
          onClick={aviso}
          style={{
            width: "100%",
            marginTop: "6px",
            padding: "8px",
            background: "transparent",
            color: "#555",
            border: "1px solid #333",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          🔔 Avise-me quando disponível
        </button>
      </div>
    </div>
  );
}
