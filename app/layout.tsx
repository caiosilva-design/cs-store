import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "CS Store",
  description: "Camisas premium e personalizadas",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="pt-br">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* 🔥 NAVBAR GLOBAL */}
        <Navbar />

        {/* 🔥 CONTEÚDO */}
        <main
          style={{
            flex: 1,
            marginTop: "80px",
            padding: "0 16px",
          }}
        >
          {children}
        </main>

        {/* 🔥 RODAPÉ */}
        <Footer />
      </body>
    </html>
  );
}
