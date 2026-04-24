"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  variacoes?: { tamanho: string; disponivel: boolean }[];
};

export type CartItem = {
  produto: Produto;
  tamanho: string;
  quantidade: number;
};

type StoreContextType = {
  cart: CartItem[];
  favoritos: number[];
  addToCart: (produto: Produto, tamanho: string) => void;
  removeFromCart: (produtoId: number, tamanho: string) => void;
  updateQty: (produtoId: number, tamanho: string, qty: number) => void;
  clearCart: () => void;
  toggleFavorito: (id: number) => void;
  isFavorito: (id: number) => boolean;
  cartCount: number;
  cartTotal: number;
};

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favoritos, setFavoritos] = useState<number[]>([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cs_cart");
      const savedFavs = localStorage.getItem("cs_favoritos");
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedFavs) setFavoritos(JSON.parse(savedFavs));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("cs_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cs_favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const addToCart = (produto: Produto, tamanho: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.produto.id === produto.id && i.tamanho === tamanho
      );
      if (existing) {
        return prev.map((i) =>
          i.produto.id === produto.id && i.tamanho === tamanho
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }
      return [...prev, { produto, tamanho, quantidade: 1 }];
    });
  };

  const removeFromCart = (produtoId: number, tamanho: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.produto.id === produtoId && i.tamanho === tamanho))
    );
  };

  const updateQty = (produtoId: number, tamanho: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(produtoId, tamanho);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.produto.id === produtoId && i.tamanho === tamanho
          ? { ...i, quantidade: qty }
          : i
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const isFavorito = (id: number) => favoritos.includes(id);

  const cartCount = cart.reduce((sum, i) => sum + i.quantidade, 0);
  const cartTotal = cart.reduce(
    (sum, i) => sum + i.produto.preco * i.quantidade,
    0
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        favoritos,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleFavorito,
        isFavorito,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
