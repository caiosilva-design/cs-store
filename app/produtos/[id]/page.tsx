import Link from "next/link";
export default async function ProdutoPage({ params }: any) {
 const res = await fetch(`https://cs-store-api-production.up.railway.app/produtos/${params.id}`, {
   cache: "no-store"
 });
 const produto = await res.json();
 if (!produto) {
   return <div>Produto não encontrado</div>;
 }
 const isCaixa = produto.nome.toLowerCase().includes("caixa");
 return (
<main style={{
     maxWidth: "1200px",
     margin: "0 auto",
     padding: "40px",
     color: "white"
   }}>
<div style={{
       display: "flex",
       gap: "40px",
       flexWrap: "wrap"
     }}>
       {/* IMAGEM */}
<img
         src={produto.imagem}
         alt={produto.nome}
         style={{ width: "400px", borderRadius: "12px" }}
       />
       {/* INFO */}
<div>
<h1>{produto.nome}</h1>
<h2 style={{ color: "#FFD700" }}>
           R$ {produto.preco}
</h2>
         {/* TAMANHO */}
<div style={{ marginTop: "20px" }}>
<p>Selecione o tamanho:</p>
<select style={{ padding: "10px", borderRadius: "6px" }}>
             {isCaixa ? (
<option>Único</option>
             ) : (
               ["P", "M", "G", "GG"].map(t => (
<option key={t}>{t}</option>
               ))
             )}
</select>
</div>
         {/* WHATSAPP */}
<a
           href={`https://wa.me/5511972734037?text=Quero ${produto.nome}`}
           target="_blank"
>
<button style={{
             marginTop: "20px",
             background: "#FFD700",
             color: "#000",
             padding: "12px 20px",
             borderRadius: "8px",
             fontWeight: "bold"
           }}>
             Comprar no WhatsApp
</button>
</a>
         {/* AVISO */}
<div style={{ marginTop: "40px" }}>
<h3>Avise-me quando chegar</h3>
<select>
<option>P</option>
<option>M</option>
<option>G</option>
<option>GG</option>
</select>
<input placeholder="Seu WhatsApp" />
<input placeholder="Seu email" />
<button>Enviar aviso</button>
</div>
         {/* AVALIAÇÃO */}
<div style={{ marginTop: "40px" }}>
<h3>Avaliar produto</h3>
<p>Qualidade do tecido:</p>
<select>
             {[1,2,3,4,5].map(n => (
<option key={n}>{n} ⭐</option>
             ))}
</select>
<p>Preço justo?</p>
<select>
             {[1,2,3,4,5].map(n => (
<option key={n}>{n} ⭐</option>
             ))}
</select>
<button>Enviar avaliação</button>
</div>
</div>
</div>
</main>
 );
}
