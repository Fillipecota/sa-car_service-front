'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export interface Produto {
  id: number;
  categoria: string;
  modelo: string;
  ano: number;
  cor: string;
  motor: number;
  pneu: string;
}

interface ProductionContextType {
  produtos: Produto[];
  adicionarProduto: (
    produto: Omit<Produto, "id" | "ano"> & { quantidade: number }
  ) => void;
}

const ProductionContext = createContext<ProductionContextType | null>(null);

export function ProductionProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const adicionarProduto: ProductionContextType["adicionarProduto"] = ({
    quantidade,
    ...info
  }) => {
    const primeiroId = produtos.length ? produtos[produtos.length - 1].id + 1 : 1;
    const ano = new Date().getFullYear();

    const novos = Array.from({ length: quantidade }, (_, i) => ({
      id: primeiroId + i,
      ano,
      ...info,
    }));

    setProdutos((prev) => [...prev, ...novos].slice(-5));
  };

  return (
    <ProductionContext.Provider value={{ produtos, adicionarProduto }}>
      {children}
    </ProductionContext.Provider>
  );
}

export function useProduction() {
  const ctx = useContext(ProductionContext);
  if (!ctx) throw new Error("useProduction fora do provider");
  return ctx;
}