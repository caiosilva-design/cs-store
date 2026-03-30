"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PersonalizarPage() {
  const params = useParams();
  const id = params.id;

  const [produto, setProduto] = useState<any>(null);
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [tamanho, setTamanho] = useState("");

  // 🔥 BUSCAR PRODUTO
  useEffect(() => {
    if (!id) return;

    fetch(`https://cs-store-api-production.up.railway.app/produto/${id}`)
      .then((res) => res.json())
      .then(setProduto);
  }, [id]);

  if (!produto) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        Carregando...
      </div>
    );
  }

  // 🛒 FINALIZAR
  const finalizar = () => {
    if (!nome || !numero || !tamanho) {
      alert("Preencha nome, número e tamanho");
      return;
    }

    const texto = `🔥 Pedido Personalizado

Produto: ${produto.nome}
Tamanho: ${tamanho}
Nome: ${nome}
Número: ${numero}

Valor: R$ ${produto.preco}`;

    window.open(
      `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`
    );
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
        {/* 🖼 PREVIEW CAMISA */}
        <div style={{ position: "relative" }}>
          <img
            src={produto.imagem}
            alt={produto.nome}
            style={{
              width: "100%",
              borderRadius: "20px",
            }}
          />

          {/* NOME (COSTAS) */}
          <div
            style={{
              position: "absolute",
              top: "35%",
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "22px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "white",
              textShadow: "0 0 10px rgba(0,0,0,0.8)",
            }}
          >
            {nome}
          </div>

          {/* NÚMERO (COSTAS) */}
          <div
            style={{
              position: "absolute",
              top: "45%",
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "48px",
              color: "white",
              textShadow: "0 0 10px rgba(0,0,0,0.8)",
            }}
          >
            {numero}
          </div>
        </div>

        {/* 📦 FORMULÁRIO */}
        <div>
          <h1 style={{ fontSize: "32px" }}>
            Personalizar camisa
          </h1>

          <h2 style={{ color: "#FFD700", marginTop: "10px" }}>
            {produto.nome}
          </h2>

          {/* NOME */}
          <div style={{ marginTop: "20px" }}>
            <p>Nome (máx. 12 caracteres)</p>
            <input
              value={nome}
              maxLength={12}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Neymar"
              style={input}
            />
          </div>

          {/* NÚMERO */}
          <div style={{ marginTop: "20px" }}>
            <p>Número (0 - 99)</p>
            <input
              value={numero}
              maxLength={2}
              onChange={(e) =>
                setNumero(e.target.value.replace(/\D/g, ""))
              }
              placeholder="10"
              style={input}
            />
          </div>

          {/* TAMANHO */}
          <div style={{ marginTop: "20px" }}>
            <p>Tamanho</p>
            <select
              onChange={(e) => setTamanho(e.target.value)}
              style={input}
            >
              <option value="">Selecione</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
            </select>
          </div>

          {/* BOTÃO */}
          <button
            onClick={finalizar}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "15px",
              background: "#FFD700",
              color: "black",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            FINALIZAR PERSONALIZAÇÃO
          </button>
        </div>
      </div>
    </main>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "5px",
  background: "#111",
  color: "white",
  border: "1px solid #333",
  borderRadius: "6px",
};