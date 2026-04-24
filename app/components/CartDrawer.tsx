"use client";
import { useStore } from "../context/StoreContext";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useStore();

  const finalizarPedido = () => {
    if (cart.length === 0) return;
    const linhas = cart.map(
      (i) =>
        `• ${i.produto.nome} | Tamanho: ${i.tamanho} | Qtd: ${i.quantidade} | R$ ${i.produto.preco * i.quantidade}`
    );
    const texto = `🛒 *Pedido CS Store*\n\n${linhas.join("\n")}\n\n*Total: R$ ${cartTotal}*`;
    window.open(
      `https://wa.me/5511972734037?text=${encodeURIComponent(texto)}`,
      "_blank"
    );
  };

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 1000,
          }}
        />
      )}

      {/* DRAWER */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "380px",
          background: "#0d0d0d",
          borderLeft: "1px solid #222",
          zIndex: 1001,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #222",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "white", fontSize: "18px" }}>
            🛒 Carrinho{" "}
            {cart.length > 0 && (
              <span style={{ color: "#FFD700", fontSize: "14px" }}>
                ({cart.length} {cart.length === 1 ? "item" : "itens"})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* ITENS */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#555",
                marginTop: "60px",
              }}
            >
              <p style={{ fontSize: "40px" }}>🛒</p>
              <p style={{ marginTop: "10px" }}>Seu carrinho está vazio</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.produto.id}-${item.tamanho}`}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px",
                  marginBottom: "12px",
                  background: "#161616",
                  borderRadius: "10px",
                  border: "1px solid #2a2a2a",
                }}
              >
                <img
                  src={`/api/image?url=${encodeURIComponent(item.produto.imagem)}`}
                  alt={item.produto.nome}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      color: "white",
                      fontSize: "13px",
                      fontWeight: "bold",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.produto.nome}
                  </p>
                  <p
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      marginTop: "2px",
                    }}
                  >
                    Tam: {item.tamanho}
                  </p>
                  <p
                    style={{
                      color: "#FFD700",
                      fontWeight: "bold",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    R$ {item.produto.preco * item.quantidade}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "8px",
                    }}
                  >
                    <button
                      onClick={() =>
                        updateQty(
                          item.produto.id,
                          item.tamanho,
                          item.quantidade - 1
                        )
                      }
                      style={qtyBtn}
                    >
                      −
                    </button>
                    <span style={{ color: "white", fontSize: "14px" }}>
                      {item.quantidade}
                    </span>
                    <button
                      onClick={() =>
                        updateQty(
                          item.produto.id,
                          item.tamanho,
                          item.quantidade + 1
                        )
                      }
                      style={qtyBtn}
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        removeFromCart(item.produto.id, item.tamanho)
                      }
                      style={{
                        ...qtyBtn,
                        marginLeft: "auto",
                        color: "#ff4444",
                        borderColor: "#ff4444",
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "20px",
              borderTop: "1px solid #222",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <span style={{ color: "#aaa" }}>Total:</span>
              <span
                style={{
                  color: "#FFD700",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                R$ {cartTotal}
              </span>
            </div>
            <button
              onClick={finalizarPedido}
              style={{
                width: "100%",
                padding: "14px",
                background: "#FFD700",
                color: "black",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              FINALIZAR VIA WHATSAPP →
            </button>
            <button
              onClick={clearCart}
              style={{
                width: "100%",
                padding: "10px",
                background: "transparent",
                color: "#555",
                border: "1px solid #333",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "8px",
                fontSize: "13px",
              }}
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const qtyBtn: React.CSSProperties = {
  width: "26px",
  height: "26px",
  background: "transparent",
  border: "1px solid #444",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
};
