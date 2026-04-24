"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
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
          padding: scrolled ? "12px 40px" : "20px 40px",
          background: scrolled ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
          transition: "all 0.3s ease",
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

        {/* MENU */}
        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
            fontSize: "14px",
            letterSpacing: "1px",
          }}
        >
          {[
            { nome: "Início", link: "/" },
            { nome: "Catálogo", link: "/produtos" },
            { nome: "Sobre", link: "/sobre" },
            { nome: "Contato", link: "/contato" },
          ].map((item) => (
            <Link
              key={item.nome}
              href={item.link}
              style={{
                position: "relative",
                textDecoration: "none",
                color: "white",
              }}
            >
              <span
                style={{ transition: "0.3s", cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#FFD700")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "white")
                }
              >
                {item.nome}
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: "-6px",
                  left: 0,
                  width: "0%",
                  height: "2px",
                  background: "#FFD700",
                  transition: "0.3s",
                }}
                className="underline"
              />
            </Link>
          ))}

          {/* FAVORITOS */}
          <Link
            href="/favoritos"
            style={{ position: "relative", textDecoration: "none" }}
          >
            <span
              style={{ fontSize: "20px", cursor: "pointer" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "0.7")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = "1")
              }
            >
              ♡
            </span>
            {favoritos.length > 0 && (
              <span
                style={{
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
                }}
              >
                {favoritos.length}
              </span>
            )}
          </Link>

          {/* CARRINHO */}
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              color: "white",
              padding: "0",
            }}
          >
            🛒
            {cartCount > 0 && (
              <span
                style={{
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
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* BOTÃO CTA */}
          <Link href="/produtos">
            <button
              style={{
                padding: "8px 18px",
                background: "#FFD700",
                color: "black",
                border: "none",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(255,215,0,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Comprar
            </button>
          </Link>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
