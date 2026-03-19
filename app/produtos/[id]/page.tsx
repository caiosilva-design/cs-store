import { createClient } from "@/lib/supabase/server";
export default async function ProdutoPage({ params }: any) {
 const supabase = createClient();
 // 🔥 PRODUTO
 const { data: produto } = await supabase
   .from("produtos")
   .select("*")
   .eq("id", params.id)
   .single();
 // 🔥 VARIAÇÕES
 const { data: variacoes } = await supabase
   .from("variacoes")
   .select("*")
   .eq("produto_id", params.id);
 if (!produto) {
   return <div>Produto não encontrado</div>;
 }
 // 🧠 REGRA: Caixa sempre disponível
 const isCaixa = produto.nome.toLowerCase().includes("caixa");
 return (
<main style={{
     padding: "100px 20px",
     maxWidth: "1200px",
     margin: "0 auto",
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
         style={{
           width: "400px",
           borderRadius: "12px"
         }}
       />
       {/* INFO */}
<div>
<h1>{produto.nome}</h1>
<h2 style={{ color: "#FFD700" }}>
           R$ {produto.preco}
</h2>
         {/* TAMANHOS */}
<div style={{ marginTop: "20px" }}>
<p>Selecione o tamanho:</p>
<div style={{ display: "flex", gap: "10px" }}>
             {(isCaixa
               ? [{ tamanho: "Único", disponivel: true }]
               : variacoes
             )?.map((v: any, i: number) => (
<button
                 key={i}
                 disabled={!v.disponivel}
                 style={{
                   padding: "10px 15px",
                   borderRadius: "6px",
                   border: v.disponivel
                     ? "1px solid #FFD700"
                     : "1px solid gray",
                   background: "transparent",
                   color: v.disponivel ? "white" : "gray",
                   cursor: v.disponivel ? "pointer" : "not-allowed"
                 }}
>
                 {v.tamanho}
</button>
             ))}
</div>
</div>
         {/* WHATSAPP */}
<a
           href={`https://wa.me/5511972734037?text=Olá, quero o produto ${produto.nome}`}
           target="_blank"
           style={{
             display: "inline-block",
             marginTop: "20px",
             background: "#FFD700",
             color: "#000",
             padding: "12px 20px",
             borderRadius: "8px",
             fontWeight: "bold"
           }}
>
           Comprar no WhatsApp
</a>
</div>
</div>
</main>
 );
}