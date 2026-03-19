import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"; // 👈 ADICIONADO
export const metadata = {
 title: "CRIA STUDIO",
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
<main style={{ flex: 1, marginTop: "80px" }}>
         {children}
</main>
       {/* 🔥 RODAPÉ (MANTIDO) */}
<Footer />
</body>
</html>
 );
}
