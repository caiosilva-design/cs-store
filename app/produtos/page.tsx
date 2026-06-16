"use client";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { deveExibirProduto } from "../utils/preco";

type Variacao = { tamanho: string; disponivel: boolean };
type Produto = { id: number; nome: string; imagem: string; preco: number; preco_antigo?: number; variacoes?: Variacao[] };
type GrupoCategoria = "Todos" | "Masculina" | "Feminina" | "Cropped" | "Bermuda" | "Caixa";
type GrupoQualidade = "Todas" | "Premium" | "Tailandesa";

function getCategoria(nome: string): GrupoCategoria {
  const n = nome.toLowerCase();
  if (n.includes("cropped")) return "Cropped";
  if (n.includes("feminina") || n.includes("feminino")) return "Feminina";
  if (n.includes("caixa")) return "Caixa";
  if (n.includes("bermuda")) return "Bermuda";
  return "Masculina";
}

function getQualidade(nome: string): GrupoQualidade | null {
  const cat = getCategoria(nome);
  if (cat === "Bermuda" || cat === "Caixa" || cat === "Cropped") return null;
  if (nome.toLowerCase().includes("tailandesa")) return "Tailandesa";
  return "Premium";
}

function normalizarTamanho(t: string): string {
  if (t.toUpperCase().includes("UNICO")) return "ÚNICO";
  return t.toUpperCase();
}

const ORDEM_TAMANHOS = ["P", "M", "G", "GG", "XL", "2XL", "3XL", "4XL", "ÚNICO"];

function ordenarTamanhos(ts: string[]): string[] {
  return [...ts].sort((a, b) => {
    const ia = ORDEM_TAMANHOS.indexOf(a);
    const ib = ORDEM_TAMANHOS.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [tamanhoFiltro, setTamanhoFiltro] = useState<string | null>(null);
  const [categoria, setCategoria] = useState<GrupoCategoria>("Todos");
  const [qualidade, setQualidade] = useState<GrupoQualidade>("Todas");
  const [loading, setLoading] = useState(true);
  const [tamanhosDinamicos, setTamanhosDinamicos] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://cs-store-api-production.up.railway.app/produtos")
      .then((res) => res.json())
      .then((data: Produto[]) => {
        setProdutos(data);
        setLoading(false);
        const set = new Set<string>();
        data.forEach((p) =>
          p.variacoes?.forEach((v) => {
            if (v.disponivel) set.add(normalizarTamanho(v.tamanho));
          })
        );
        setTamanhosDinamicos(ordenarTamanhos(Array.from(set)));
      });
  }, []);

  const filtrados = produtos.filter((p) => {
    if (!deveExibirProduto(p.nome)) return false;
    // apenas produtos com ao menos uma variação disponível
    const temEstoque = p.variacoes?.some((v) => v.disponivel) ?? false;
    if (!temEstoque) return false;

    const matchNome = p.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoria === "Todos" || getCategoria(p.nome) === categoria;
    const matchQualidade =
      qualidade === "Todas" || getQualidade(p.nome) === qualidade;
    const matchTamanho =
      !tamanhoFiltro ||
      p.variacoes?.some(
        (v) => v.disponivel && normalizarTamanho(v.tamanho) === tamanhoFiltro
      );

    return matchNome && matchCategoria && matchQualidade && matchTamanho;
  });

  const categorias: GrupoCategoria[] = ["Todos", "Masculina", "Feminina", "Cropped", "Bermuda", "Caixa"];
  const qualidades: GrupoQualidade[] = ["Todas", "Premium", "Tailandesa"];

  const btnBase: React.CSSProperties = {
    marginRight: "8px",
    marginBottom: "8px",
    padding: "8px 16px",
    border: "1px solid #333",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
    transition: "0.2s",
  };

  return (
    <div style={{ padding: "100px 20px 60px", background: "#000", color: "white", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "34px", fontWeight: "bold", letterSpacing: "1px" }}>
        Catálogo
      </h1>

      {/* BUSCA */}
      <input
        placeholder="Buscar produto..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "14px",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #222",
          outline: "none",
          background: "#111",
          color: "white",
          fontSize: "14px",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.currentTarget.style.border = "1px solid #FFD700")}
        onBlur={(e) => (e.currentTarget.style.border = "1px solid #222")}
      />

      {/* FILTRO CATEGORIA */}
      <div style={{ marginBottom: "6px", fontSize: "11px", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Categoria
      </div>
      <div style={{ marginBottom: "16px", display: "flex", flexWrap: "wrap" }}>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            style={{
              ...btnBase,
              background: categoria === cat ? "#7c3aed" : "#111",
              color: categoria === cat ? "white" : "white",
              borderColor: categoria === cat ? "#7c3aed" : "#333",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FILTRO QUALIDADE */}
      <div style={{ marginBottom: "6px", fontSize: "11px", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Qualidade
      </div>
      <div style={{ marginBottom: "16px", display: "flex", flexWrap: "wrap" }}>
        {qualidades.map((q) => (
          <button
            key={q}
            onClick={() => setQualidade(q)}
            style={{
              ...btnBase,
              background: qualidade === q ? "#059669" : "#111",
              color: "white",
              borderColor: qualidade === q ? "#059669" : "#333",
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* FILTRO TAMANHO */}
      <div style={{ marginBottom: "6px", fontSize: "11px", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Tamanho
      </div>
      <div style={{ marginBottom: "25px", display: "flex", flexWrap: "wrap" }}>
        <button
          onClick={() => setTamanhoFiltro(null)}
          style={{
            ...btnBase,
            background: tamanhoFiltro === null ? "#FFD700" : "#111",
            color: tamanhoFiltro === null ? "black" : "white",
            borderColor: tamanhoFiltro === null ? "#FFD700" : "#333",
          }}
        >
          Todos
        </button>
        {tamanhosDinamicos.map((t) => (
          <button
            key={t}
            onClick={() => setTamanhoFiltro(t)}
            style={{
              ...btnBase,
              background: tamanhoFiltro === t ? "#FFD700" : "#111",
              color: tamanhoFiltro === t ? "black" : "white",
              borderColor: tamanhoFiltro === t ? "#FFD700" : "#333",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {loading && (
        <p style={{ textAlign: "center", opacity: 0.5, marginTop: "60px" }}>
          Carregando produtos...
        </p>
      )}

      {!loading && (
        <p style={{ fontSize: "12px", color: "#475569", marginBottom: "20px" }}>
          {filtrados.length} produto{filtrados.length !== 1 ? "s" : ""}
        </p>
      )}

      {!loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "25px",
          }}
        >
          {filtrados.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      )}

      {!loading && filtrados.length === 0 && (
        <p style={{ marginTop: "50px", opacity: 0.6, textAlign: "center" }}>
          Nenhum produto encontrado.
        </p>
      )}
    </div>
  );
}
