"use client";
import { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";

export default function Favoritos() {
  const { favoritos } = useStore();
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://cs-store-api-production.up.railway.app/produtos")
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);
        setLoading(false);
      });
  }, []);

  const favoritados = produtos.filter((p: any) =>
    favoritos.includes(p.id)
  );

  return (
    <div
      style={{
        padding: "120px 20px",
        background: "#000",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* TÍTULO */}
      <h1
        style={{
          marginBottom: "8px",
          fontSize: "34px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        Favoritos
      </h1>
      <p style={{ opacity: 0.5, marginBottom: "40px", fontSize: "14px" }}>
        {favoritados.length === 0
          ? "Você ainda não favoritou nenhum produto"
          : `${favoritados.length} ${favoritados.length === 1 ? "produto favoritado" : "produtos favoritados"}`}
      </p>

      {/* LOADING */}
      {loading && (
        <p style={{ textAlign: "center", opacity: 0.5, marginTop: "60px" }}>
          Carregando...
        </p>
      )}

      {/* VAZIO */}
      {!loading && favoritados.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <p style={{ fontSize: "60px" }}>🤍</p>
          <p
            style={{
              opacity: 0.5,
              marginTop: "16px",
              fontSize: "16px",
            }}
          >
            Explore o catálogo e favorite os produtos que gostar
          </p>
          <a href="/produtos">
            <button
              style={{
                marginTop: "24px",
                padding: "14px 32px",
                background: "#FFD700",
                color: "black",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              VER CATÁLOGO
            </button>
          </a>
        </div>
      )}

      {/* GRID */}
      {!loading && favoritados.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "25px",
          }}
        >
          {favoritados.map((p: any) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
