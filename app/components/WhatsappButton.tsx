export default function WhatsappButton() {
  const msg = encodeURIComponent(
    "Olá! Vi o site da CS Store e gostaria de saber mais sobre os produtos."
  );

  return (
    
      href={`https://wa.me/5511972734037?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Falar no WhatsApp"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: "#25D366",
        color: "white",
        width: "54px",
        height: "54px",
        borderRadius: "50%",
        fontSize: "26px",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
        zIndex: 998,
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "scale(1.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
    >
      💬
    </a>
  );
}
