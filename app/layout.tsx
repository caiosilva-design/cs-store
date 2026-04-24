import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { StoreProvider } from "./context/StoreContext";

export const metadata = {
  title: "CS Store | Camisas de Futebol Premium em São Paulo",
  description:
    "Camisas de futebol premium e personalizadas. Times brasileiros e internacionais, camisas tailandesas e personalizações exclusivas. Entregamos para todo o Brasil.",
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
        <StoreProvider>
          <Navbar />
          <main
            style={{
              flex: 1,
              marginTop: "80px",
              padding: "0 16px",
            }}
          >
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
