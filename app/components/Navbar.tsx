import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
 return (
<nav style={{
     display: "flex",
     justifyContent: "space-between",
     alignItems: "center",
     padding: "20px 40px",
     position: "fixed",
     width: "100%",
     top: 0,
     zIndex: 10,
     background: "rgba(0,0,0,0.6)",
     backdropFilter: "blur(10px)"
   }}>
     {/* LOGO */}
<Link href="/">
<Image src="/logo.png" alt="logo" width={50} height={50} />
</Link>
     {/* MENU */}
<div style={{ display: "flex", gap: "30px" }}>
<Link href="/">Início</Link>
<Link href="/catalogo">Catálogo</Link>
<Link href="/sobre">Sobre</Link>
<Link href="/contato">Contato</Link>
</div>
</nav>
 );
}
