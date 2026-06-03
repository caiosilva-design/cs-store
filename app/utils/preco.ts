/**
 * Regras de exibição:
 * - Produtos com "drop", "vip" ou "UPGRADE" no nome NÃO devem ser exibidos no site
 *
 * O cálculo de preço é feito na API — o frontend usa diretamente
 * produto.preco (preço final) e produto.preco_antigo (riscado).
 */

export function deveExibirProduto(nome: string): boolean {
  const n = nome.toLowerCase();
  return !n.includes("drop") && !n.includes("vip") && !n.includes("upgrade");
}
