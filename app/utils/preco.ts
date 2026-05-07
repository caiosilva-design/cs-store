/**
 * Regras de preço CS Store:
 * - Brasil + Copa (ambos no nome): R$ 150 → R$ 120 promo
 * - Cropped: R$ 80 → R$ 65 promo
 * - Caixa: R$ 50 → R$ 30 promo
 * - Tailandesa: +R$ 50 no preço cheio e no promo
 * - Bermuda + Mauricinho (ambos no nome): R$ 75 → R$ 50 promo
 * - Demais: R$ 120 → R$ 90 promo
 *
 * Regras de exibição:
 * - Produtos com "drop", "vip" ou "UPGRADE" no nome NÃO devem ser exibidos no site
 */

export type Preco = {
  original: number;
  promo: number;
  emPromocao: boolean;
};

/**
 * Retorna true se o produto pode ser exibido no site.
 * Produtos com "drop" ou "vip" no nome são bloqueados.
 */
export function deveExibirProduto(nome: string): boolean {
  const n = nome.toLowerCase();
  return !n.includes("drop") && !n.includes("vip") && !n.includes("upgrade");
}

export function calcularPreco(nome: string): Preco {
  const n = nome.toLowerCase();

  const isTailandes = n.includes("tailandesa") || n.includes("tailandês");
  const isBrasilCopa =
    (n.includes("brasil") || n.includes("seleção brasileira")) &&
    n.includes("copa");
  const isCropped = n.includes("cropped") || n.includes("crop");
  const isCaixa = n.includes("caixa");
  const isBermudaMauricinho =
    n.includes("bermuda") && n.includes("mauricinho");

  let original: number;
  let promo: number;

  if (isBrasilCopa) {
    original = 150;
    promo = 120;
  } else if (isCropped) {
    original = 80;
    promo = 65;
  } else if (isCaixa) {
    original = 50;
    promo = 30;
  } else if (isBermudaMauricinho) {
    original = 75;
    promo = 50;
  } else {
    original = 120;
    promo = 90;
  }

  if (isTailandes) {
    original += 50;
    promo += 50;
  }

  return { original, promo, emPromocao: original !== promo };
}
