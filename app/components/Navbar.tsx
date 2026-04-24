"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, favoritos } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 999,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: scrolled ? "12px 20px" : "20px 20px",
          background: scrolled ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
      >
        {/* LOGO */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={scrolled ? 32 : 40}
            height={scrolled ? 32 : 40}
            style={{ cursor: "pointer", transition: "0.3s" }}
          />
        </Link>

        {/* DESKTOP */}
        <div className="navDesktop">
          {[
            { nome: "Inicio", link: "/" },
            { nome: "Catalogo", link: "/produtos" },
            { nome: "Sobre", link: "/sobre" },
            { nome: "Contato", link: "/contato" },
          ].map((item) => (
            <Link
              key={item.nome}
              href={item.link}
              style={{ position: "relative", textDecoration: "none", color: "white" }}
            >
              <span
                style={{ transition: "0.3s", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
                {item.nome}
              </span>
            </Link>
          ))}

          <Link href="/favoritos" style={{ position: "relative", textDecoration: "none" }}>
            <span style={{ fontSize: "20px", cursor: "pointer", color: "white" }}>&#9825;</span>
            {favoritos.length > 0 && <span style={badgeStyle}>{favoritos.length}</span>}
          </Link>

          <button onClick={() => setCartOpen(true)} style={iconBtn}>
            <span style={{ fontSize: "20px" }}>&#128722;</span>
            {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
          </button>

          <Link href="/produtos">
            <button
              style={{ padding: "8px 18px", background: "#FFD700", color: "black", border: "none", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(255,215,0,0.6)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Comprar
            </button>
          </Link>
        </div>

        {/* MOBILE */}
        <div className="navMobile">
          <Link href="/favoritos" style={{ position: "relative", textDecoration: "none", color: "white" }}>
            <span style={{ fontSize: "22px" }}>&#9825;</span>
            {favoritos.length > 0 && <span style={badgeStyle}>{favoritos.length}</span>}
          </Link>

          <button onClick={() => setCartOpen(true)} style={iconBtn}>
            <span style={{ fontSize: "22px" }}>&#128722;</span>
            {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "transparent", border: "none", color: "white", fontSize: "22px", cursor: "pointer", padding: 0, fontWeight: "bold" }}
          >
            {menuOpen ? "X" : "MENU"}
          </button>
        </div>
      </nav>

      {/* DROPDOWN MOBILE */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            width: "100%",
            background: "rgba(0,0,0,0.97)",
            zIndex: 998,
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: "4px",
            borderBottom: "1px solid #222",
          }}
        >
          {[
            { nome: "Inicio", link: "/" },
            { nome: "Catalogo", link: "/produtos" },
            { nome: "Favoritos", link: "/favoritos" },
            { nome: "Sobre", link: "/sobre" },
            { nome: "Contato", link: "/contato" },
          ].map((item) => (
            <Link
              key={item.nome}
              href={item.link}
              onClick={() => setMenuOpen(false)}
              style={{ color: "white", textDecoration: "none", padding: "14px 10px", fontSize: "16px", borderBottom: "1px solid #1a1a1a", letterSpacing: "1px" }}
            >
              {item.nome}
            </Link>
          ))}
          
            href="https://wa.me/5511972734037"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{ marginTop: "12px", padding: "14px", background: "#FFD700", color: "black", textDecoration: "none", borderRadius: "8px", fontWeight: "bold", textAlign: "center", fontSize: "14px" }}
          >
            COMPRAR VIA WHATSAPP
          </a>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

const badgeStyle: React.CSSProperties = {
  position: "absolute",
  top: "-6px",
  right: "-8px",
  background: "#FFD700",
  color: "black",
  borderRadius: "50%",
  width: "16px",
  height: "16px",
  fontSize: "10px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconBtn: React.CSSProperties = {
  position: "relative",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "white",
  padding: "0",
};
