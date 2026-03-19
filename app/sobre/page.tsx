"use client";
import Link from "next/link";
export default function Sobre() {
 return (
<main
     style={{
       padding: "120px 20px",
       background: "#000",
       color: "white",
     }}
>
     {/* HERO */}
<section style={{ textAlign: "center", marginBottom: "80px" }}>
<h1 style={{ fontSize: "50px" }}>
         NOSSA <span style={{ color: "#FFD700" }}>HISTÓRIA</span>
</h1>
<p style={{ opacity: 0.7, marginTop: "10px" }}>
         De uma ideia simples a um movimento de estilo
</p>
</section>
     {/* HISTÓRIA */}
<section
       style={{
         display: "grid",
         gridTemplateColumns: "1fr 1fr",
         gap: "40px",
         marginBottom: "80px",
       }}
>
<div>
<h2 style={{ color: "#FFD700" }}>2020 - O COMEÇO</h2>
<p style={{ opacity: 0.8 }}>
           Tudo começou com uma visão simples: trazer camisetas
           personalizadas de qualidade premium para as ruas.
           Começamos pequeno, entregando pessoalmente e criando
           conexões reais com cada cliente.
</p>
</div>
<div className="fadeIn">
<div className="boxDestaque">
<h1>1</h1>
<p>Pessoa</p>
</div>
</div>
</section>
     {/* CRESCIMENTO */}
<section
       style={{
         display: "grid",
         gridTemplateColumns: "1fr 1fr",
         gap: "40px",
         marginBottom: "80px",
       }}
>
<div className="boxDestaque">
<h1>100+</h1>
<p>Clientes satisfeitos</p>
</div>
<div>
<h2 style={{ color: "#FFD700" }}>2021-2022 - CRESCIMENTO</h2>
<p style={{ opacity: 0.8 }}>
           A marca começou a crescer naturalmente. Clientes voltavam,
           indicavam amigos e a qualidade começou a falar por si só.
</p>
</div>
</section>
     {/* EXPANSÃO */}
<section
       style={{
         display: "grid",
         gridTemplateColumns: "1fr 1fr",
         gap: "40px",
         marginBottom: "80px",
       }}
>
<div>
<h2 style={{ color: "#FFD700" }}>2023-2024 - EXPANSÃO</h2>
<p style={{ opacity: 0.8 }}>
           Ultrapassamos 1000 vendas e expandimos para diversas regiões.
           Hoje levamos estilo e identidade para todo o Brasil.
</p>
</div>
<div className="boxDestaque">
<h1>1000+</h1>
<p>Vendas</p>
</div>
</section>
     {/* VALORES */}
<section style={{ textAlign: "center", marginBottom: "80px" }}>
<h2>
         NOSSOS <span style={{ color: "#FFD700" }}>VALORES</span>
</h2>
<div
         style={{
           display: "grid",
           gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
           gap: "20px",
           marginTop: "40px",
         }}
>
         {[
           {
             titulo: "Qualidade Premium",
             desc: "Materiais de alto padrão e acabamento impecável.",
           },
           {
             titulo: "Comunidade",
             desc: "Clientes fazem parte da nossa história.",
           },
           {
             titulo: "Inovação",
             desc: "Designs únicos e criativos.",
           },
         ].map((item) => (
<div className="boxCard" key={item.titulo}>
<h3>{item.titulo}</h3>
<p>{item.desc}</p>
</div>
         ))}
</div>
</section>
     {/* INFORMATIVO */}
<section style={{ textAlign: "center", marginBottom: "80px" }}>
<h2 style={{ color: "#FFD700" }}>INFORMATIVO</h2>
<p style={{ opacity: 0.7 }}>
         Trabalhamos com produtos selecionados, qualidade premium e envio rápido.
         Após a compra, você pode solicitar vídeos e fotos reais do produto antes do envio.
</p>
</section>
     {/* CTA FINAL */}
<section style={{ textAlign: "center" }}>
<h2>
         FAÇA PARTE DA NOSSA <span style={{ color: "#FFD700" }}>HISTÓRIA</span>
</h2>
<div style={{ marginTop: "20px" }}>
<Link href="/produtos">
<button className="btnGold">Ver Catálogo</button>
</Link>
<a
           href="https://wa.me/5511972734037"
           target="_blank"
           style={{ marginLeft: "10px" }}
>
<button className="btnOutline">WhatsApp</button>
</a>
</div>
</section>
</main>
 );
}
