# CS Store

Loja virtual da CS Store — camisetas premium, femininas, cropped, bermudas e caixas presente.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS inline / globals.css**
- API REST: `https://cs-store-api-production.up.railway.app`

## Estrutura

```
app/
├── page.tsx                  # Home (hero, destaques, diferenciais)
├── produtos/page.tsx         # Catálogo com filtros
├── produto/[id]/page.tsx     # Detalhe do produto
├── produto/[id]/personalizar # Personalização de camisa
├── favoritos/page.tsx        # Lista de favoritos
├── contato/page.tsx          # Página de contato
├── sobre/page.tsx            # Sobre a loja
├── components/               # Navbar, Footer, ProductCard, CartDrawer, WhatsappButton
├── context/StoreContext.tsx  # Carrinho e favoritos (Context API)
└── utils/preco.ts            # Regras de exibição de produto
```

## Regras de negócio

### Exibição de produtos
Produtos com `drop`, `vip` ou `upgrade` no nome **não são exibidos** no site (ver `utils/preco.ts`).
Produtos sem nenhuma variação disponível (`disponivel = true`) também não aparecem no catálogo.

### Categorias (por nome do produto)
| Categoria  | Regra                                          |
|------------|------------------------------------------------|
| Cropped    | nome contém "cropped"                          |
| Feminina   | nome contém "feminina" ou "feminino"           |
| Caixa      | nome contém "caixa"                            |
| Bermuda    | nome contém "bermuda"                          |
| Masculina  | todos os demais                                |

### Qualidade (por nome do produto)
| Qualidade   | Regra                                                        |
|-------------|--------------------------------------------------------------|
| Tailandesa  | nome contém "tailandesa"                                     |
| Premium     | camisetas (Masculina/Feminina) sem "tailandesa" no nome      |
| —           | Bermuda, Caixa e Cropped não entram no filtro de qualidade   |

### Tamanhos
Tamanhos são carregados dinamicamente da API. Qualquer tamanho com "UNICO" no valor é exibido como **ÚNICO**.
Ordem de exibição: P → M → G → GG → XL → 2XL → 3XL → 4XL → ÚNICO.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Deploy

Hospedado na [Vercel](https://vercel.com). Push na `main` faz deploy automático.
