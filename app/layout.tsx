import Navbar from "./components/Navbar";
export default function RootLayout({ children }: any) {
 return (
<html lang="pt-BR">
<body>
<Navbar />
       {children}
</body>
</html>
 );
}
