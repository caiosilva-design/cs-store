import Link from "next/link";
export default function Navbar() {
 return (
<header style={styles.nav}>
<div style={styles.logo}>CRIA STUDIO</div>
<nav style={styles.links}>
<Link href="/">Início</Link>
<Link href="/produtos">Catálogo</Link>
<Link href="/sobre">Sobre</Link>
<Link href="/contato">Contato</Link>
</nav>
</header>
 );
}
const styles = {
 nav: {
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
   padding: "20px 40px",
   background: "#000",
   borderBottom: "1px solid #222",
   position: "sticky" as const,
   top: 0,
   zIndex: 100,
 },
 logo: {
   color: "#d4af37",
   fontSize: "20px",
   fontWeight: "bold",
   letterSpacing: "2px",
 },
 links: {
   display: "flex",
   gap: "25px",
   fontSize: "14px",
 },
};
