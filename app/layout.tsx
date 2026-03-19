import "./globals.css";
import Footer from "./components/Footer";
export const metadata = {
 title: "CRIA STUDIO",
 description: "Camisas premium e personalizadas"
};
export default function RootLayout({ children }: any) {
 return (
<html lang="pt-br">
<body
       style={{
         display: "flex",
         flexDirection: "column",
         minHeight: "100vh"
       }}
>
       {/* CONTEÚDO */}
<main style={{ flex: 1 }}>
         {children}
</main>
       {/* RODAPÉ GLOBAL */}
<Footer />
</body>
</html>
 );
}
