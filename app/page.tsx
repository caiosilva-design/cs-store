import Link from "next/link";
export default function Home() {
 return (
<main>
     {/* HERO */}
<section style={styles.hero}>
<div style={styles.overlay} />
<div style={styles.content}>
<span style={styles.badge}>• NOVA COLEÇÃO 2026</span>
<h1 style={styles.title}>
           VISTA O <br />
<span style={{ color: "#d4af37" }}>QUE TE REPRESENTA</span>
</h1>
<p style={styles.subtitle}>
           Camisas personalizadas com qualidade premium.
           Estilo único e 100% autêntico.
</p>
<div style={styles.buttons}>
<Link href="/produtos" style={styles.btnPrimary}>
             VER CATÁLOGO
</Link>
<a
             href="https://wa.me/5511972734037"
             target="_blank"
             style={styles.btnOutline}
>
             PERSONALIZAR
</a>
</div>
</div>
</section>
</main>
 );
}
const styles = {
 hero: {
   height: "100vh",
   backgroundImage: "url('/bg.jpg')", // 👈 coloca sua imagem aqui
   backgroundSize: "cover",
   backgroundPosition: "center",
   position: "relative" as const,
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
 },
 overlay: {
   position: "absolute" as const,
   top: 0,
   left: 0,
   width: "100%",
   height: "100%",
   background: "rgba(0,0,0,0.7)",
 },
 content: {
   position: "relative" as const,
   textAlign: "center" as const,
   color: "#fff",
   maxWidth: "800px",
   padding: "20px",
 },
 badge: {
   color: "#d4af37",
   fontSize: "14px",
   letterSpacing: "1px",
 },
 title: {
   fontSize: "64px",
   fontWeight: "bold",
   marginTop: "20px",
   lineHeight: "1.1",
 },
 subtitle: {
   marginTop: "20px",
   color: "#ccc",
   fontSize: "16px",
 },
 buttons: {
   marginTop: "30px",
   display: "flex",
   gap: "20px",
   justifyContent: "center",
   flexWrap: "wrap" as const,
 },
 btnPrimary: {
   background: "#d4af37",
   color: "#000",
   padding: "14px 24px",
   fontWeight: "bold",
   borderRadius: "6px",
 },
 btnOutline: {
   border: "1px solid #d4af37",
   color: "#d4af37",
   padding: "14px 24px",
   borderRadius: "6px",
 },
};
