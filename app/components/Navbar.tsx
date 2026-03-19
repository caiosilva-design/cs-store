import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
 return (
<nav style={{
     position: "fixed",
     top: 0,
     width: "100%",
     zIndex: 999,
     display: "flex",
     justifyContent: "space-between",
     alignItems: "center",
     padding: "20px 40px",
     background: "rgba(0,0,0,0.8)",
     backdropFilter: "blur(10px)"
   }}>
     {/* LOGO */}
<Link href="/">
<Image src="/logo.png" alt="logo" width={40} height={40} />
</Link>
     {/* MENU */}
<div style={{ display: "flex", gap: "25px", color: "white" }}>
<Link href="/">Início</Link>
<Link href="/catalogo">Catálogo</Link>
<Link href="/sobre">Sobre</Link>
<Link href="/contato">Contato</Link>
</div>
</nav>
 );
}
